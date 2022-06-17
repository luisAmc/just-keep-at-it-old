import { builder } from '../builder';

builder.prismaObject('WorkoutSet', {
  findUnique: (workoutSet) => ({ id: workoutSet.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    mins: t.exposeInt('mins', { nullable: true }),
    lbs: t.exposeInt('lbs', { nullable: true }),
    reps: t.exposeInt('reps', { nullable: true })
  })
});
