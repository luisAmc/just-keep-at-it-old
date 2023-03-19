import { ExerciseType } from '@prisma/client';
import { authenticateUser, hashPassword } from 'src/utils/auth';
import { db } from 'src/utils/prisma';
import { createSession } from 'src/utils/sessions';
import { builder } from '../builder';

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
    resolve: async (_query, _parent, { input }, { ironSession }) => {
      const user = await authenticateUser(input.username, input.password);

      await createSession(ironSession, user);

      return user;
    }
  })
);

const SignUpInput = builder.inputType('SignUpInput', {
  fields: (t) => ({
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
    resolve: async (query, _parent, { input }, { ironSession }) => {
      const user = await db.user.create({
        ...query,
        data: {
          username: input.username,
          hashedPassword: await hashPassword(input.password)
        }
      });

      const SEED_CATEGORIES = [
        {
          name: 'Aerobics',
          type: ExerciseType.AEROBIC,
          exercises: ['Treadmill', 'Cycling']
        },
        {
          name: 'Arms',
          type: ExerciseType.STRENGTH,
          exercises: [
            'Bicep Curl (Dumbell)',
            'Preacher Curl (Barbell)',
            'Preacher Curl (Machine)',
            'Single Arm Preacher Curl',
            'Tricep Extension (Cable)',
            'Tricep Extension (Machine)'
          ]
        },
        {
          name: 'Shoulders',
          type: ExerciseType.STRENGTH,
          exercises: [
            'Shoulder Press',
            'Lateral Raises (Machine)',
            'Rear Delt Fly',
            'Standing Row'
          ]
        },
        {
          name: 'Chest',
          type: ExerciseType.STRENGTH,
          exercises: [
            'Bench Press (Machine)',
            'Incline Bench Press (Machine)',
            'Decline Cable Press'
          ]
        },
        {
          name: 'Back',
          type: ExerciseType.STRENGTH,
          exercises: [
            'Seated Row',
            'Seated Row (Unilateral)',
            'Lat Pulldown',
            'Front Pulldown'
          ]
        },
        {
          name: 'Legs',
          type: ExerciseType.STRENGTH,
          exercises: [
            'Leg Press',
            'Leg Extensions',
            'Hamstring Curls',
            'Adductors (Close)',
            'Abductors (Open)',
            'Calf Extensions',
            'Kick Backs'
          ]
        }
      ];

      for (const category of SEED_CATEGORIES) {
        await db.exerciseCategory.upsert({
          where: {
            userId_name: {
              userId: user.id,
              name: category.name
            }
          },
          create: {
            userId: user.id,
            name: category.name,
            type: category.type,
            exercises: {
              createMany: {
                data: category.exercises.map((exerciseName) => ({
                  userId: user.id,
                  name: exerciseName
                }))
              }
            }
          },
          update: {}
        });
      }

      await createSession(ironSession, user);

      return user;
    }
  })
);
