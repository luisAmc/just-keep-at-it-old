import { builder } from '../builder';

builder.prismaObject('WorkoutSet', {
  findUnique: (workoutSet) => ({ id: workoutSet.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    mins: t.exposeFloat('mins'),
    distance: t.exposeFloat('distance'),
    kcal: t.exposeInt('kcal'),

    lbs: t.exposeFloat('lbs'),
    reps: t.exposeInt('reps')
  })
});
