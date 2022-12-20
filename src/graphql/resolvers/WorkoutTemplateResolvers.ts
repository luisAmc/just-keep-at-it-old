import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('WorkoutTemplate', {
  findUnique: (template) => ({ id: template.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    exercises: t.relation('exercises', {
      query: {
        orderBy: {
          index: 'asc'
        }
      }
    })
  })
});

builder.prismaObject('ExerciseOnWorkoutTemplate', {
  findUnique: (template) => ({ id: template.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    exercise: t.relation('exercise')
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
              index: t.int(),
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
            createMany: {
              data: input.exercises.map((exercise) => ({
                index: exercise.index,
                exerciseId: exercise.exerciseId
              }))
            }
          }
        }
      });
    }
  })
);

builder.mutationField('deleteWorkoutTemplate', (t) =>
  t.prismaField({
    type: 'WorkoutTemplate',
    args: {
      id: t.arg.id()
    },
    resolve: async (query, _parent, { id }, { session }) => {
      const template = await db.workoutTemplate.findFirstOrThrow({
        where: {
          id,
          userId: session!.userId
        },
        include: {
          exercises: {
            select: {
              id: true
            }
          }
        }
      });

      await db.exerciseOnWorkoutTemplate.deleteMany({
        where: {
          id: {
            in: template.exercises.map((e) => e.id)
          }
        }
      });

      return await db.workoutTemplate.delete({ ...query, where: { id } });
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
              exerciseId: true
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
              data: template.exercises.map(({ exerciseId }, i) => ({
                userId: session!.userId,
                index: i,
                exerciseId: exerciseId
              }))
            }
          }
        }
      });
    }
  })
);
