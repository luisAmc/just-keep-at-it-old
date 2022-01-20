import { db } from 'src/utils/prisma';
import { builder } from '../builder';
import { authenticateUser, hashPassword } from 'src/utils/auth';
import { createSession } from 'src/utils/sessions';

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    username: t.exposeString('username')
  })
});

const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    username: t.string(),
    password: t.string()
  })
});

builder.mutationField('login', (t) =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: {
      input: t.arg({ type: LoginInput })
    },
    resolve: async (_query, _root, { input }, { req }) => {
      const user = await authenticateUser(input.username, input.password);

      await createSession(req, user);

      return user;
    }
  })
);

const SignUpInput = builder.inputType('SignUpInput', {
  fields: (t) => ({
    name: t.string({}),
    username: t.string(),
    password: t.string()
  })
});

builder.mutationField('signUp', (t) =>
  t.prismaField({
    type: 'User',
    skipTypeScopes: true,
    authScopes: {
      unauthenticated: true
    },
    args: { input: t.arg({ type: SignUpInput }) },
    resolve: async (query, _root, { input }, { req }) => {
      const user = await db.user.create({
        ...query,
        data: {
          name: input.name,
          username: input.username,
          hashedPassword: await hashPassword(input.password)
        }
      });

      await createSession(req, user);

      return user;
    }
  })
);
