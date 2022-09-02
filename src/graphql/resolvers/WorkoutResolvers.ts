import { ExerciseType, WorkoutStatus } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Workout', {
  findUnique: (workout) => ({ id: workout.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    status: t.exposeString('status'),
    completedAt: t.expose('completedAt', { type: 'DateTime', nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    workoutExercises: t.relation('workoutExercises', {
      query: {
        orderBy: {
          index: 'asc'
        }
      }
    }),
    workoutExercisesCount: t.relationCount('workoutExercises')
  })
});

const ExerciseOptionInput = builder.inputType('ExerciseOptionInput', {
  fields: (t) => ({ id: t.string() })
});

const CreateWorkoutInput = builder.inputType('CreateWorkoutInput', {
  fields: (t) => ({
    name: t.string(),
    workoutExercises: t.field({ type: [ExerciseOptionInput] })
  })
});

builder.mutationField('createWorkout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      input: t.arg({ type: CreateWorkoutInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      return await db.workout.create({
        ...query,
        data: {
          userId: session!.userId,
          name: input.name,
          workoutExercises: {
            createMany: {
              data: input.workoutExercises.map((exercise, index) => ({
                index: index,
                userId: session!.userId,
                exerciseId: exercise.id
              }))
            }
          }
        }
      });
    }
  })
);

builder.queryField('workouts', (t) =>
  t.prismaField({
    type: ['Workout'],
    resolve: (query, _parent, _args, { session }) => {
      return db.workout.findMany({
        ...query,
        where: {
          userId: session!.userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }
  })
);

builder.queryField('workout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      id: t.arg.id()
    },
    resolve: (query, _parent, { id }, { session }) => {
      return db.workout.findFirstOrThrow({
        ...query,
        where: { id, userId: session?.userId }
      });
    }
  })
);

const GetWorkoutDoneInput = builder.inputType('GetWorkoutDoneInput', {
  fields: (t) => ({
    workoutId: t.string(),
    workoutExercises: t.field({
      type: [
        builder.inputType('DoneExerciseInput', {
          fields: (t) => ({
            id: t.string(),
            sets: t.field({
              type: [
                builder.inputType('DoneExerciseSetInput', {
                  fields: (t) => ({
                    mins: t.int({ required: false }),
                    distance: t.int({ required: false }),
                    kcal: t.int({ required: false }),
                    lbs: t.int({ required: false }),
                    reps: t.int({ required: false })
                  })
                })
              ]
            })
          })
        })
      ]
    })
  })
});

builder.mutationField('getWorkoutDone', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      input: t.arg({ type: GetWorkoutDoneInput })
    },
    resolve: async (_query, _parent, { input }) => {
      const workout = await db.$transaction(async (db) => {
        for (const exercise of input.workoutExercises) {
          for (const set of exercise.sets) {
            await db.workoutSet.create({
              data: {
                workoutExerciseId: exercise.id,
                mins: set.mins ?? 0,
                distance: set.distance ?? 0,
                kcal: set.kcal ?? 0,
                lbs: set.lbs ?? 0,
                reps: set.reps ?? 0
              }
            });
          }
        }

        return db.workout.update({
          where: {
            id: input.workoutId
          },
          data: {
            status: WorkoutStatus.DONE,
            completedAt: new Date()
          }
        });
      });

      return workout;
    }
  })
);

builder.mutationField('doItAgain', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      workoutToCopyId: t.arg.id()
    },
    resolve: async (query, _parent, { workoutToCopyId }, { session }) => {
      const workoutToCopy = await db.workout.findUniqueOrThrow({
        where: {
          id: workoutToCopyId
        },
        include: {
          workoutExercises: {
            select: { exerciseId: true }
          }
        }
      });

      return await db.workout.create({
        ...query,
        data: {
          userId: session!.userId,
          name: workoutToCopy.name,
          workoutExercises: {
            createMany: {
              data: workoutToCopy.workoutExercises.map(
                (workoutExercise, index) => ({
                  index,
                  userId: session!.userId,
                  exerciseId: workoutExercise.exerciseId
                })
              )
            }
          }
        }
      });
    }
  })
);

const AddExerciseToWorkoutInput = builder.inputType(
  'AddExerciseToWorkoutInput',
  {
    fields: (t) => ({
      workoutId: t.string(),
      exerciseId: t.string()
    })
  }
);

builder.mutationField('addExerciseToWorkout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      input: t.arg({ type: AddExerciseToWorkoutInput })
    },
    resolve: async (_query, _parent, { input }, { session }) => {
      const workout = await db.workout.findFirstOrThrow({
        where: { id: input.workoutId, userId: session!.userId },
        select: {
          workoutExercises: true
        }
      });

      return await db.workout.update({
        where: { id: input.workoutId },
        data: {
          workoutExercises: {
            create: {
              index: workout.workoutExercises.length,
              userId: session!.userId,
              exerciseId: input.exerciseId
            }
          }
        }
      });
    }
  })
);
