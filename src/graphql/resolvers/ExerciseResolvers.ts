import { ExerciseType, MuscleGroup, WorkoutStatus } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Exercise', {
  findUnique: (exercise) => ({ id: exercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    type: t.exposeString('type'),
    muscleGroup: t.exposeString('muscleGroup', { nullable: true }),
    lastSession: t.prismaField({
      type: 'WorkoutExercise',
      nullable: true,
      resolve: (query, parent) => {
        return db.workoutExercise.findFirst({
          ...query,
          where: {
            exerciseId: parent.id,
            workout: { status: { equals: WorkoutStatus.DONE } }
          },
          take: 1
        });
      }
    }),
    doneSessions: t.relation('workoutExercises', {
      args: {
        limit: t.arg.int({ defaultValue: 10 })
      },
      query: ({ limit }) => ({
        where: {
          workout: {
            status: { equals: WorkoutStatus.DONE }
          }
        },
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        }
      })
    })
  })
});

const CreateExerciseInput = builder.inputType('CreateExerciseInput', {
  fields: (t) => ({
    name: t.string(),
    type: t.string(),
    muscleGroup: t.string({ required: false })
  })
});

builder.mutationField('createExercise', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: {
      input: t.arg({ type: CreateExerciseInput })
    },
    resolve: (query, _parent, { input }, { session }) => {
      return db.exercise.create({
        ...query,
        data: {
          name: input.name,
          type: input.type as keyof typeof ExerciseType,
          muscleGroup: input.muscleGroup as keyof typeof MuscleGroup,
          userId: session!.userId
        }
      });
    }
  })
);

builder.queryField('exercise', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: {
      id: t.arg.id()
    },
    resolve: async (query, _parent, { id }, { session }) =>
      await db.exercise.findFirstOrThrow({
        ...query,
        where: {
          id: id,
          userId: session!.userId
        }
      })
  })
);
