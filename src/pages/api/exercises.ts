import Exercise from 'src/models/Exercise';
import Session from 'src/models/Session';
import { CreateExerciseInput } from 'src/resolvers/ExercisesResolver';
import withSession, { IRON_SESSION_ID_KEY } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const exercises = await Exercise.find().sort('type');

        return res.json({ exercises });
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

        const data: CreateExerciseInput = req.body;

        const exercise = new Exercise({
          name: data.name,
          type: data.type,
          muscleGroup: data.muscleGroup
        });

        await exercise.save();

        return res.json(exercise);
      } catch (err) {
        if (err.code === 11000) {
          return res
            .status(400)
            .json(
              `Ya se ha ingresado anteriomente un ejercicio con el mismo nombre. (${req.body.name})`
            );
        }

        return res.status(400).json(err.message);
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
});
