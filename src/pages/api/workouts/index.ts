import { ClientSession } from 'mongoose';
import Session from 'src/models/Session';
import Workout from 'src/models/Workout';
import WorkoutExercise from 'src/models/WorkoutExercise';
import { CreateWorkoutInput } from 'src/resolvers/WorkoutsResolvers';
import dbConnect from 'src/utils/dbConnect';
import withSession, { IRON_SESSION_ID_KEY } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  const conn = await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const workouts = await Workout.find()
          .populate({
            path: 'workoutExercises',
            populate: { path: 'exercise', select: 'name type muscleGroup' }
          })
          .sort('-createdAt')
          .lean();

        return res.json({ workouts });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    case 'POST': {
      const transactionSesion: ClientSession = await conn.startSession();
      transactionSesion.startTransaction();

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
          createdBy: session.user._id
        });

        const workoutExercisesIds = [];
        for (const exercise of data.workoutExercises) {
          const workoutExercise = new WorkoutExercise({
            exercise,
            workout: workout._id,
            sets: [],
            createdBy: session.user._id
          });

          await workoutExercise.save({ session: transactionSesion });

          workoutExercisesIds.push(workoutExercise._id);
        }

        workout.workoutExercises = workoutExercisesIds;
        await workout.save({ session: transactionSesion });

        await transactionSesion.commitTransaction();
        transactionSesion.endSession();

        return res.json(workout);
      } catch (err) {
        await transactionSesion.abortTransaction();
        transactionSesion.endSession();

        return res.status(400).json(err.message);
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
});
