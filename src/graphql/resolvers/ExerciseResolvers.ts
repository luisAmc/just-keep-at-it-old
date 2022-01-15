import { ExerciseType, MuscleGroup } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Exercise', {
  findUnique: (exercise) => ({ id: exercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    type: t.exposeString('type'),
    muscleGroup: t.exposeString('muscleGroup', { nullable: true })
  })
});

builder.queryField('exercises', (t) =>
  t.prismaField({
    type: ['Exercise'],
    resolve: (query) => {
      return db.exercise.findMany({
        ...query,
        orderBy: { createdAt: 'desc' }
      });
    }
  })
);

const CreateExerciseInput = builder.inputType('CreateExerciseInput', {
  fields: (t) => ({
    name: t.string(),
    type: t.string(),
    muscleGroup: t.string({ required: false })
  })
});

builder.mutationField('createExercise', (t) =>
  t.prismaField({
    type: 'Exercise',
    args: {
      input: t.arg({ type: CreateExerciseInput })
    },
    resolve: async (query, _parent, { input }) => {
      const exercise = await db.exercise.create({
        ...query,
        data: {
          name: input.name,
          type: ExerciseType[input.type as keyof typeof ExerciseType],
          muscleGroup:
            MuscleGroup[input.muscleGroup as keyof typeof MuscleGroup]
        }
      });

      return exercise;
    }
  })
);
