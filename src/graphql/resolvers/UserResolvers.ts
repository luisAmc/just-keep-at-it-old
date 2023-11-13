import { db } from 'src/utils/prisma';
import { builder } from '../builder';
import { WorkoutStatus } from '@prisma/client';
import { addWeeks, startOfWeek } from 'date-fns';

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username'),
    workoutTemplates: t.relation('workoutTemplates'),
    exerciseCategories: t.relation('categories', {
      query: { orderBy: { type: 'desc' } }
    }),
    exercises: t.relation('exercises', {
      query: {
        orderBy: [{ name: 'asc' }]
      }
    }),
    workoutsCount: t.relationCount('workouts'),
    workouts: t.relation('workouts', {
      args: {
        offset: t.arg.int({ defaultValue: 0 }),
        limit: t.arg.int({ defaultValue: 5 })
      },
      query: ({ offset, limit }) => ({
        take: limit,
        skip: offset,
        orderBy: {
          updatedAt: 'desc'
        }
      })
    }),
    workedDays: t.field({
      type: ['DateTime'],
      resolve: async ({ id }) => {
        const today = new Date();
        const weekStart = startOfWeek(today);
        const start = addWeeks(weekStart, -2);

        const completedWorkouts = await db.workout.findMany({
          where: {
            userId: id,
            status: WorkoutStatus.DONE,
            completedAt: {
              gte: start
            }
          },
          select: {
            completedAt: true
          }
        });

        return completedWorkouts.map((workout) => workout.completedAt!);
      }
    })
  })
});

builder.queryField('viewer', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    skipTypeScopes: true,
    resolve: (query, _parent, _args, { session }) => {
      if (!session?.userId) {
        return null;
      }

      return db.user.findUniqueOrThrow({
        ...query,
        where: {
          id: session.userId
        }
      });
    }
  })
);
