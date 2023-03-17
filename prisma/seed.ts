import { db } from '../src/utils/prisma';
import { ExerciseType } from '@prisma/client';
import SecurePassword from 'secure-password';

const securePassword = new SecurePassword();

const CATEGORIES_COUNT = 3;
const EXERCISE_COUNT = 3;

async function main() {
  const user = await db.user.upsert({
    where: { username: 'demouser' },
    create: {
      username: 'demouser',
      hashedPassword: await securePassword.hash(Buffer.from('demouser'))
    },
    update: {}
  });

  for (let i = 0; i < CATEGORIES_COUNT; i++) {
    const categoryName = `Category-${i}`;

    await db.exerciseCategory.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: categoryName
        }
      },
      create: {
        name: categoryName,
        type: i === 0 ? ExerciseType.AEROBIC : ExerciseType.STRENGTH,
        userId: user.id,
        exercises: {
          createMany: {
            data: Array.from({ length: EXERCISE_COUNT }).map((_, i) => ({
              name: `${categoryName} Exercise-${i}`,
              userId: user.id
            }))
          }
        }
      },
      update: {}
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
