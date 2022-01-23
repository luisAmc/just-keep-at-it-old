import { ExerciseType, MuscleGroup } from '@prisma/client';
import { db } from 'src/utils/prisma';
import { builder } from '../builder';

const ExerciseRef = builder.prismaObject('Exercise', {
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
    resolve: (query, _parent, _args, { session }) => {
      return db.exercise.findMany({
        ...query,
        where: { userId: session!.userId },
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

const CreateExerciseResult = builder.simpleObject('CreateExerciseResult', {
  fields: (t) => ({
    exercise: t.field({ type: ExerciseRef })
  })
});

builder.mutationField('createExercise', (t) =>
  t.field({
    type: CreateExerciseResult,
    args: {
      input: t.arg({ type: CreateExerciseInput })
    },
    resolve: async (_parent, { input }, { session }) => {
      const exercise = await db.exercise.create({
        data: {
          name: input.name,
          type: ExerciseType[input.type as keyof typeof ExerciseType],
          muscleGroup:
            MuscleGroup[input.muscleGroup as keyof typeof MuscleGroup],
          userId: session!.userId
        }
      });

      return { exercise };
    }
  })
);
