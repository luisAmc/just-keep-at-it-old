import { ClientSession } from 'mongoose';
import Session from 'src/models/Session';
import Workout from 'src/models/Workout';
import WorkoutExercise from 'src/models/WorkoutExercise';
import dbConnect from 'src/utils/dbConnect';
import withSession, { IRON_SESSION_ID_KEY } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;
  const { workoutId } = req.query;

  const conn = await dbConnect();

  switch (method) {
    case 'POST': {
      const transactionSesion: ClientSession = await conn.startSession();
      transactionSesion.startTransaction();

      try {
        const session = await Session.findById(
          req.session.get(IRON_SESSION_ID_KEY)
        )
          .populate('user', 'username')
          .lean();

        const baseWorkout = await Workout.findById(workoutId)
          .populate('workoutExercises')
          .lean();

        const workout = new Workout({
          name: baseWorkout.name,
          createdBy: session.user._id
        });

        const workoutExercisesIds = [];
        for (const workoutExercise of baseWorkout.workoutExercises) {
          const newWorkoutExercise = new WorkoutExercise({
            exercise: workoutExercise.exercise._id,
            workout: workout._id,
            sets: [],
            createdBy: session.user._id
          });

          await newWorkoutExercise.save({ session: transactionSesion });

          workoutExercisesIds.push(newWorkoutExercise._id);
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
