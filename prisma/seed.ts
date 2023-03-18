import { db } from '../src/utils/prisma';
import { ExerciseType } from '@prisma/client';
import SecurePassword from 'secure-password';

const securePassword = new SecurePassword();

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
    exercises: ['Shoulder Press', 'Lateral Raises (Machine)', 'Rear Delt Fly']
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

async function main() {
  const user = await db.user.upsert({
    where: { username: 'demouser' },
    create: {
      username: 'demouser',
      hashedPassword: await securePassword.hash(Buffer.from('demouser'))
    },
    update: {}
  });

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
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
