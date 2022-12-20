import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('WorkoutTemplate', {
  findUnique: (template) => ({ id: template.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    exercises: t.relation('exercises')
  })
});

builder.queryField('workoutTemplates', (t) =>
  t.prismaField({
    type: ['WorkoutTemplate'],
    resolve: (query, _parent, _args, { session }) =>
      db.workoutTemplate.findMany({
        ...query,
        where: {
          userId: session!.userId
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
  })
);

builder.queryField('workoutTemplate', (t) =>
  t.prismaField({
    type: 'WorkoutTemplate',
    args: {
      id: t.arg.id()
    },
    resolve: (query, _parent, { id }, { session }) =>
      db.workoutTemplate.findFirstOrThrow({
        ...query,
        where: { id, userId: session!.userId }
      })
  })
);

const CreateWorkoutTemplateInput = builder.inputType(
  'CreateWorkoutTemplateInput',
  {
    fields: (t) => ({
      name: t.string(),
      exercises: t.field({
        type: [
          builder.inputType('CreateWorkoutTemplateExerciseInput', {
            fields: (t) => ({
              exerciseId: t.id()
            })
          })
        ]
      })
    })
  }
);

builder.mutationField('createWorkoutTemplate', (t) =>
  t.prismaField({
    type: 'WorkoutTemplate',
    args: {
      input: t.arg({ type: CreateWorkoutTemplateInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      return await db.workoutTemplate.create({
        ...query,
        data: {
          userId: session!.userId,
          name: input.name,
          exercises: {
            connect: input.exercises.map((exercise) => ({
              id: exercise.exerciseId
            }))
          }
        }
      });
    }
  })
);

builder.mutationField('startWorkoutFromTemplate', (t) =>
  t.prismaField({
    type: 'Workout',
    args: {
      id: t.arg.id()
    },
    resolve: async (query, _parent, { id }, { session }) => {
      const template = await db.workoutTemplate.findFirstOrThrow({
        where: {
          id,
          userId: session!.userId
        },
        select: {
          name: true,
          exercises: {
            select: {
              id: true
            }
          }
        }
      });

      return await db.workout.create({
        ...query,
        data: {
          userId: session!.userId,
          name: template.name,
          workoutExercises: {
            createMany: {
              data: template.exercises.map((exercise, i) => ({
                userId: session!.userId,
                index: i,
                exerciseId: exercise.id
              }))
            }
          }
        }
      });
    }
  })
);
