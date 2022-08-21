import { builder } from '../builder';

builder.prismaObject('WorkoutSet', {
  findUnique: (workoutSet) => ({ id: workoutSet.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    mins: t.exposeInt('mins'),
    distance: t.exposeInt('distance'),
    kcal: t.exposeInt('kcal'),

    lbs: t.exposeInt('lbs'),
    reps: t.exposeInt('reps')
  })
});
