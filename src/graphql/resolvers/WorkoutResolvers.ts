import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Workout', {
  findUnique: (workout) => ({ id: workout.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    status: t.exposeString('status'),
    completedAt: t.expose('completedAt', { type: 'DateTime', nullable: true }),
    // workoutExercises: t.relation('workoutExercises')
    workoutExercisesCount: t.relationCount('workoutExercises')
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
