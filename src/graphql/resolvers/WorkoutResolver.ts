import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('WorkoutSet', {
  findUnique: (workoutSet) => ({ id: workoutSet.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    mins: t.exposeInt('mins', { nullable: true }),
    lbs: t.exposeInt('lbs', { nullable: true }),
    reps: t.exposeInt('reps', { nullable: true })
  })
});

builder.prismaObject('WorkoutExercise', {
  findUnique: (workoutExercise) => ({ id: workoutExercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    exercise: t.relation('exercise', {
      resolve: (query, workoutExercise) => {
        return db.exercise.findUnique({
          ...query,
          where: { id: workoutExercise.exerciseId },
          rejectOnNotFound: true
        });
      }
    }),
    sets: t.relation('sets', {
      resolve: (query, workoutExercise) =>
        db.workoutSet.findMany({
          ...query,
          where: { workoutExerciseId: workoutExercise.id }
        })
    })
  })
});

builder.prismaNode('Workout', {
  // findUnique: (workout) => ({ id: workout.id }),
  findUnique: (id) => ({ id }),
  id: { resolve: (workout) => workout.id },
  fields: (t) => ({
    // id: t.exposeID('id'),
    name: t.exposeString('name'),
    status: t.exposeString('status'),
    doneAt: t.expose('doneAt', { nullable: true, type: 'DateTime' }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    workoutExercises: t.relation('workoutExercises', {
      resolve: (query, workout) =>
        db.workoutExercise.findMany({
          ...query,
          where: { workoutId: workout.id }
        })
    })
  })
});

builder.queryField('workout', (t) =>
  t.prismaField({
    type: 'Workout',
    args: { id: t.arg.globalID({ required: true }) },
    resolve: (query, _parent, { id }) => {
      return db.workout.findFirst({
        ...query,
        where: { id: id.id },
        rejectOnNotFound: true
      });
    }
  })
);

builder.queryField('workouts', (t) =>
  t.prismaField({
    type: ['Workout'],
    resolve: (query, _parent, _args, { session }) =>
      db.workout.findMany({
        ...query,
        where: { userId: session!.userId },
        orderBy: {
          createdAt: 'desc'
        }
      })
  })
);

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
      const workout = await db.workout.create({
        ...query,
        data: {
          userId: session!.userId,
          name: input.name,
          workoutExercises: {
            create: input.workoutExercises.map((exercise) => ({
              userId: session!.userId,
              exerciseId: exercise.id
            }))
          }
        }
      });

      return workout;
    }
  })
);
