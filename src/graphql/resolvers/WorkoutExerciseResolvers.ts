import { builder } from '../builder';

builder.prismaObject('WorkoutExercise', {
  findUnique: (workoutExercise) => ({ id: workoutExercise.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    exerciseIndex: t.exposeInt('exerciseIndex'),
    setsCount: t.relationCount('sets'),
    sets: t.relation('sets', {
      query: {
        orderBy: { setIndex: 'asc' }
      }
    }),
    workout: t.relation('workout'),
    exercise: t.relation('exercise'),
    createdAt: t.expose('createdAt', { type: 'DateTime' })
  })
});
