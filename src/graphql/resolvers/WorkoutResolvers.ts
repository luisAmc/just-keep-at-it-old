import { WorkoutStatus } from '@prisma/client';
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
              data: input.workoutExercises.map((exercise) => ({
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

builder.mutationField('deleteWorkout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      workoutId: t.arg.id()
    },
    resolve: async (_query, _parent, { workoutId }, { session }) => {
      await db.workout.findFirstOrThrow({
        where: {
          id: workoutId,
          userId: session!.userId
        }
      });

      return await db.workout.delete({
        where: {
          id: workoutId
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
    workoutId: t.id(),
    workoutExercises: t.field({
      type: [
        builder.inputType('DoneExerciseInput', {
          fields: (t) => ({
            id: t.id({ required: false }),
            exerciseId: t.id(),
            sets: t.field({
              type: [
                builder.inputType('DoneExerciseSetInput', {
                  fields: (t) => ({
                    mins: t.int(),
                    distance: t.float(),
                    kcal: t.int(),
                    lbs: t.float(),
                    reps: t.int()
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
    resolve: async (_query, _parent, { input }, { session }) => {
      const workout = await db.$transaction(async (db) => {
        const alreadyPresentWorkoutExercise = input.workoutExercises.filter(
          (workoutExercise) => workoutExercise.id != null
        );

        for (const workoutExercise of alreadyPresentWorkoutExercise) {
          await db.workoutSet.createMany({
            data: workoutExercise.sets.map((set) => ({
              workoutExerciseId: workoutExercise.id,
              mins: set.mins,
              distance: set.distance,
              kcal: set.kcal,
              lbs: set.lbs,
              reps: set.reps
            }))
          });
        }

        const newWorkoutExercises = input.workoutExercises.filter(
          (workoutExercise) => workoutExercise.id == null
        );

        for (const newWorkoutExercise of newWorkoutExercises) {
          await db.workoutExercise.create({
            data: {
              workoutId: input.workoutId,
              exerciseId: newWorkoutExercise.exerciseId,
              userId: session!.userId,
              sets: {
                createMany: {
                  data: newWorkoutExercise.sets.map((set) => ({
                    mins: set.mins,
                    distance: set.distance,
                    kcal: set.kcal,
                    lbs: set.lbs,
                    reps: set.reps
                  }))
                }
              }
            }
          });
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
