import { WorkoutStatus } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Exercise', {
  findUnique: (exercise) => ({ id: exercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    category: t.relation('category'),
    type: t.string({
      resolve: async ({ categoryId }) => {
        const category = await db.exerciseCategory.findUnique({
          where: { id: categoryId },
          select: { type: true }
        });

        return category!.type;
      }
    }),
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
          orderBy: { workout: { completedAt: 'desc' } },
          take: 1
        });
      }
    }),
    sessionsCount: t.relationCount('workoutExercises'),
    sessions: t.relation('workoutExercises', {
      args: {
        offset: t.arg.int({ defaultValue: 0 }),
        limit: t.arg.int({ defaultValue: 5 })
      },
      query: ({ offset, limit }) => ({
        skip: offset,
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        }
      })
    }),
    doneSessionsCount: t.int({
      resolve: async ({ id }) => {
        const doneSessions = await db.workoutExercise.findMany({
          where: {
            exerciseId: id,
            workout: {
              status: { equals: WorkoutStatus.DONE }
            }
          }
        });

        return doneSessions.length;
      }
    }),
    doneSessions: t.relation('workoutExercises', {
      args: {
        offset: t.arg.int({ defaultValue: 0 }),
        limit: t.arg.int({ defaultValue: 10 })
      },
      query: ({ offset, limit }) => ({
        where: {
          workout: {
            status: { equals: WorkoutStatus.DONE }
          }
        },
        skip: offset,
        take: limit,
        orderBy: {
          updatedAt: 'desc'
        }
      })
    })
  })
});

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

const CreateExerciseInput = builder.inputType('CreateExerciseInput', {
  fields: (t) => ({
    name: t.string(),
    categoryId: t.id()
  })
});

builder.mutationField('createExercise', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: {
      input: t.arg({ type: CreateExerciseInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      const category = await db.exerciseCategory.findFirstOrThrow({
        where: {
          id: input.categoryId,
          userId: session!.userId
        },
        select: {
          id: true
        }
      });

      return db.exercise.create({
        ...query,
        data: {
          name: input.name,
          categoryId: category.id,
          userId: session!.userId
        }
      });
    }
  })
);

const EditExerciseInput = builder.inputType('EditExerciseInput', {
  fields: (t) => ({
    exerciseId: t.id(),
    name: t.string()
  })
});

builder.mutationField('editExercise', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: { input: t.arg({ type: EditExerciseInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      const exercise = await db.exercise.findFirstOrThrow({
        where: {
          id: input.exerciseId,
          userId: session?.userId
        },
        select: {
          id: true
        }
      });

      return await db.exercise.update({
        ...query,
        where: { id: exercise.id },
        data: {
          name: input.name
        }
      });
    }
  })
);
