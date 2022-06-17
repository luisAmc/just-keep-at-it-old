import { ExerciseType } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Workout', {
  findUnique: (workout) => ({ id: workout.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    status: t.exposeString('status'),
    completedAt: t.expose('completedAt', { type: 'DateTime', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    // workoutExercises: t.relation('workoutExercises')
    workoutExercisesCount: t.relationCount('workoutExercises'),
    bias: t.string({
      select: {
        workoutExercises: {
          select: {
            exercise: {
              select: {
                muscleGroup: true
              }
            }
          }
        }
      },
      resolve: (workout) => {
        let mostUse = { type: '', count: 0 };
        let count: Record<string, number> = {};
        for (const workoutExercise of workout.workoutExercises) {
          const muscleGroup =
            workoutExercise.exercise.muscleGroup ?? ExerciseType.AEROBIC;

          count[muscleGroup] = count[muscleGroup] ? count[muscleGroup] + 1 : 1;
        }

        for (const type of Object.keys(count)) {
          if (count[type] > mostUse.count) {
            mostUse = { type, count: count[type] };
          }
        }

        return mostUse.type;
      }
    })
  })
});

const ExerciseOptionInput = builder.inputType('ExerciseOptionInput', {
  fields: (t) => ({ id: t.string() })
});

const CreateWorkoutInput = builder.inputType('CreateWorkoutInput', {
  fields: (t) => ({
    name: t.string(),
    workoutExercises: t.field({ type: [ExerciseOptionInput] })
  })
});

builder.mutationField('createWorkout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      input: t.arg({ type: CreateWorkoutInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      return await db.workout.create({
        ...query,
        data: {
          userId: session!.userId,
          name: input.name,
          workoutExercises: {
            create: input.workoutExercises.map((exercise) => ({
              userId: session!.userId,
              exerciseId: exercise.id
            }))
          }
        }
      });
    }
  })
);

builder.queryField('workouts', (t) =>
  t.prismaField({
    type: ['Workout'],
    resolve: (query, _parent, _args, { session }) => {
      return db.workout.findMany({
        ...query,
        where: {
          userId: session!.userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  })
);
