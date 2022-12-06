import { db } from '../src/utils/prisma';
import { MuscleGroup } from '@prisma/client';
import SecurePassword from 'secure-password';

const securePassword = new SecurePassword();

const AEROBIC_EXERCISE_COUNT = 5;
const STRENGTH_EXERCISE_COUNT = 15;

async function main() {
  const user = await db.user.upsert({
    where: { username: 'demouser' },
    create: {
      username: 'demouser',
      hashedPassword: await securePassword.hash(Buffer.from('demouser'))
    },
    update: {}
  });

  for (let i = 0; i < AEROBIC_EXERCISE_COUNT; i++) {
    await db.exercise.create({
      data: {
        name: `aerobic-exercise-${i}`,
        type: 'AEROBIC',
        userId: user.id
      }
    });
  }

  const muscleGroups: MuscleGroup[] = [
    'ARMS',
    'SHOULDERS',
    'CHEST',
    'BACK',
    'LEGS'
  ];

  for (let i = 0; i < STRENGTH_EXERCISE_COUNT; i++) {
    await db.exercise.create({
      data: {
        name: `strength-exercise-${i}`,
        type: 'STRENGTH',
        muscleGroup: muscleGroups[i % 6],
        userId: user.id
      }
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
