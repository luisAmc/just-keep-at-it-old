import { ClientSession } from 'mongoose';
import Workout from 'src/models/Workout';
import WorkoutExercise from 'src/models/WorkoutExercise';
import {
  GetWorkoutDoneInput,
  WORKOUT_STATUS
} from 'src/resolvers/WorkoutsResolvers';
import dbConnect from 'src/utils/dbConnect';
import withSession from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;
  const { workoutId } = req.query;

  const conn = await dbConnect();

  switch (method) {
    case 'PUT': {
      const transactionSesion: ClientSession = await conn.startSession();
      transactionSesion.startTransaction();

      try {
        const data: GetWorkoutDoneInput = req.body;

        for (const item of data.workoutExercises) {
          const workoutExercise = await WorkoutExercise.findById(
            item.id,
            'sets'
          );

          workoutExercise.sets = item.sets;
          
          await workoutExercise.save({ session: transactionSesion });
        }

        const workout = await Workout.findById(workoutId);
        
        workout.status = WORKOUT_STATUS.DONE;
        workout.doneAt = new Date();

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
