import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.queryField('me', (t) =>
  t.prismaField({
    type: 'User',
    nullable: true,
    skipTypeScopes: true,
    resolve: (query, _parent, _args, { session }) => {
      if (!session?.userId) {
        return null;
      }

      return db.user.findUnique({
        ...query,
        where: {
          id: session.userId
        },
        rejectOnNotFound: true
      });
    }
  })
);

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    username: t.exposeString('username')
  })
});
