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
    resolve: (query, _parent, { input }, { session }) => {
      return db.exercise.create({
        ...query,
        data: {
          name: input.name,
          type: input.type as keyof typeof ExerciseType,
          muscleGroup: input.muscleGroup as keyof typeof MuscleGroup,
          userId: session!.userId
        }
      });
    }
  })
);
