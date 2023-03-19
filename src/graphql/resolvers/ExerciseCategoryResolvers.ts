import { ExerciseType } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('ExerciseCategory', {
  findUnique: (category) => ({ id: category.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    type: t.exposeString('type'),
    exercises: t.relation('exercises')
  })
});

builder.queryField('exerciseCategories', (t) =>
  t.prismaField({
    type: ['ExerciseCategory'],
    resolve: (query, _parent, _args, { session }) =>
      db.exerciseCategory.findMany({
        ...query,
        where: { userId: session!.userId },
        orderBy: { name: 'asc' }
      })
  })
);

const CreateExerciseCategoryInput = builder.inputType(
  'CreateExerciseCategoryInput',
  {
    fields: (t) => ({
      name: t.string(),
      type: t.string()
    })
  }
);

builder.mutationField('createExerciseCategory', (t) =>
  t.prismaField({
    type: 'ExerciseCategory',
    args: {
      input: t.arg({ type: CreateExerciseCategoryInput })
    },
    resolve: async (query, _parent, { input }, { session }) => {
      return await db.exerciseCategory.create({
        ...query,
        data: {
          name: input.name,
          type: input.type as ExerciseType,
          userId: session!.userId
        }
      });
    }
  })
);
