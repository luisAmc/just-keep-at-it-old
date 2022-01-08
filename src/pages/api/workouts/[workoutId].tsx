import Workout from 'src/models/Workout';
import withSession from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;
  const { workoutId } = req.query;

  switch (method) {
    case 'GET': {
      try {
        const workout = await Workout.findById(workoutId).populate({
          path: 'workoutExercises',
          select: 'exercise',
          populate: { path: 'exercise' }
        });

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
