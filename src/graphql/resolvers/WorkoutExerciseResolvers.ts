import { WorkoutStatus } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('WorkoutExercise', {
  findUnique: (workoutExercise) => ({ id: workoutExercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    setsCount: t.relationCount('sets'),
    sets: t.relation('sets', {
      query: {
        orderBy: { index: 'asc' }
      }
    }),
    exercise: t.relation('exercise'),
    lastSession: t.prismaField({
      type: 'WorkoutExercise',
      nullable: true,
      resolve: async (_query, currentWorkoutExercise) => {
        const lastWorkoutExerciseSession = await db.workoutExercise.findFirst({
          where: {
            exerciseId: currentWorkoutExercise.exerciseId,
            workout: { status: WorkoutStatus.DONE }
          },
          orderBy: {
            updatedAt: 'asc'
          },
          take: -1,
          include: {
            sets: true
          }
        });

        return lastWorkoutExerciseSession;
      }
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' })
  })
});

builder.queryField('lastSessions', (t) =>
  t.prismaField({
    type: ['WorkoutExercise'],
    args: {
      exerciseId: t.arg.id(),
      take: t.arg.int({ required: false })
    },
    resolve: async (query, _parent, { exerciseId, take }, { session }) => {
      return await db.workoutExercise.findMany({
        ...query,
        where: {
          exerciseId: exerciseId,
          userId: session!.userId,
          workout: {
            status: WorkoutStatus.DONE
          }
        },
        orderBy: { createdAt: 'desc' },
        take: take ?? 5
      });
    }
  })
);
