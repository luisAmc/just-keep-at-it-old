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
    workoutExercisesCount: t.relationCount('workoutExercises'),
    workoutExercises: t.relation('workoutExercises', {
      query: {
        orderBy: {
          exerciseIndex: 'asc'
        }
      }
    })
  })
});

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

const ExerciseOptionInput = builder.inputType('ExerciseOptionInput', {
  fields: (t) => ({ id: t.string() })
});

const CreateWorkoutInput = builder.inputType('CreateWorkoutInput', {
  fields: (t) => ({
    name: t.string()
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
          name: input.name
        }
      });
    }
  })
);

const EditWorkoutInput = builder.inputType('EditWorkoutInput', {
  fields: (t) => ({
    workoutId: t.id(),
    name: t.string({ required: false })
  })
});

builder.mutationField('editWorkout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      input: t.arg({ type: EditWorkoutInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      const workout = await db.workout.findFirstOrThrow({
        where: {
          id: input.workoutId,
          userId: session!.userId
        },
        select: {
          id: true,
          name: true
        }
      });

      return await db.workout.update({
        ...query,
        where: {
          id: workout.id
        },
        data: {
          name: input.name ?? workout.name
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
      const workout = await db.workout.findFirstOrThrow({
        where: {
          id: workoutId,
          userId: session!.userId
        },
        include: {
          workoutExercises: {
            include: {
              sets: true
            }
          }
        }
      });

      await db.workoutSet.deleteMany({
        where: {
          workoutExerciseId: {
            in: workout.workoutExercises.map((we) => we.id)
          }
        }
      });

      await db.workoutExercise.deleteMany({ where: { workoutId: workout.id } });

      return await db.workout.delete({
        where: {
          id: workoutId
        }
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
            exerciseIndex: t.int(),
            exerciseId: t.id(),
            sets: t.field({
              type: [
                builder.inputType('DoneExerciseSetInput', {
                  fields: (t) => ({
                    id: t.id({ required: false }),
                    mins: t.float(),
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
      const workoutDraft = await db.workout.findUniqueOrThrow({
        where: { id: input.workoutId },
        select: {
          status: true
        }
      });

      if (workoutDraft.status === WorkoutStatus.DONE) {
        throw new Error('La rutina ya habia sido completada anteriormente.');
      }

      const workout = await db.$transaction(async (db) => {
        /**
         * Remove old exercises
         *
         * In the GetItDone's process, the user can remove and add new exercises
         * to the workout, if that's the case, then we don't need to keep the `unused`
         * workoutExercise records.
         *
         * TODO: What can be done instead of deleting all the previous records and
         * creating new ones based on the user's final input?
         */
        await db.workoutExercise.deleteMany({
          where: { workoutId: input.workoutId }
        });

        for (const workoutExercise of input.workoutExercises) {
          await db.workoutExercise.create({
            data: {
              workoutId: input.workoutId,
              exerciseId: workoutExercise.exerciseId,
              userId: session!.userId,
              exerciseIndex: workoutExercise.exerciseIndex,
              sets: {
                createMany: {
                  data: workoutExercise.sets.map((set, setIndex) => ({
                    setIndex: setIndex,
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

builder.mutationField('partialSave', (t) =>
  t.boolean({
    args: {
      input: t.arg({ type: GetWorkoutDoneInput })
    },
    resolve: async (_parent, { input }, { session }) => {
      const workout = await db.workout.findUniqueOrThrow({
        where: { id: input.workoutId },
        select: {
          status: true
        }
      });

      if (workout.status === WorkoutStatus.DONE) {
        return false;
      }

      const done = await db.$transaction(async (db) => {
        await db.workoutExercise.deleteMany({
          where: { workoutId: input.workoutId }
        });

        // This part is exactly the same as the `getItDone` mutation
        // Could be extracted to a function?
        for (const workoutExercise of input.workoutExercises) {
          await db.workoutExercise.create({
            data: {
              workoutId: input.workoutId,
              exerciseId: workoutExercise.exerciseId,
              userId: session!.userId,
              exerciseIndex: workoutExercise.exerciseIndex,
              sets: {
                createMany: {
                  data: workoutExercise.sets.map((set, setIndex) => ({
                    setIndex: setIndex,
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

        return true;
      });

      return done;
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
            select: { exerciseIndex: true, exerciseId: true }
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
              data: workoutToCopy.workoutExercises.map((workoutExercise) => ({
                exerciseIndex: workoutExercise.exerciseIndex,
                userId: session!.userId,
                exerciseId: workoutExercise.exerciseId
              }))
            }
          }
        }
      });
    }
  })
);
