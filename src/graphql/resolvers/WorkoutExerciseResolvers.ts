import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('WorkoutExercise', {
  findUnique: (workoutExercise) => ({ id: workoutExercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    setsCount: t.relationCount('sets'),
    sets: t.relation('sets'),
    exercise: t.relation('exercise'),
    lastSession: t.prismaField({
      type: 'WorkoutExercise',
      nullable: true,
      resolve: async (_query, currentWorkoutExercise) => {
        const lastWorkoutExerciseSession = await db.workoutExercise.findFirst({
          where: { exerciseId: currentWorkoutExercise.exerciseId },
          orderBy: {
            createdAt: 'desc'
          },
          skip: 1,
          include: {
            sets: true
          }
        });

        return lastWorkoutExerciseSession;
      }
    })
  })
});
