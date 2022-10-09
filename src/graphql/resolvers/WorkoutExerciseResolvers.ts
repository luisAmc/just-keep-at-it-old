import { builder } from '../builder';

builder.prismaObject('WorkoutExercise', {
  findUnique: (workoutExercise) => ({ id: workoutExercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    index: t.exposeInt('index'),
    setsCount: t.relationCount('sets'),
    sets: t.relation('sets', {
      query: {
        orderBy: { index: 'asc' }
      }
    }),
    exercise: t.relation('exercise'),
    createdAt: t.expose('createdAt', { type: 'DateTime' })
  })
});
