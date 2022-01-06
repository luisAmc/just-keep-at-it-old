import Session from 'src/models/Session';
import Workout from 'src/models/Workout';
import { CreateWorkoutInput } from 'src/resolvers/WorkoutsResolvers';
import withSession, { IRON_SESSION_ID_KEY } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const workouts = await Workout.find()
          .populate('exercises', 'name type muscleGroup')
          .sort('-createdAt')
          .lean();

        return res.json({ workouts });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    case 'POST': {
      try {
        const session = await Session.findById(
          req.session.get(IRON_SESSION_ID_KEY)
        )
          .populate('user', 'username')
          .lean();

        if (!session) {
          return res.status(400).json({ success: false });
        }

        const data: CreateWorkoutInput = req.body;

        const workout = new Workout({
          name: data.name,
          exercises: data.exercises,
          createdBy: session.user._id
        });

        await workout.save();

        return res.json(workout);
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
});
