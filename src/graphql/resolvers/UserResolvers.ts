import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username'),
    workoutTemplates: t.relation('workoutTemplates'),
    exercises: t.relation('exercises'),
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
