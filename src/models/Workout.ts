import mongoose from 'mongoose';
import { WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import { UserDocument } from './User';
import WorkoutExercise, { WorkoutExerciseDocument } from './WorkoutExercise';

export interface WorkoutType {
  name: string;
  workoutExercises: WorkoutExerciseDocument[];

  status: WORKOUT_STATUS;

  doneAt: Date;

  createdBy: UserDocument;
}

export interface WorkoutDocument extends WorkoutType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    workoutExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: WorkoutExercise }],

    status: {
      type: String,
      enum: WORKOUT_STATUS,
      default: WORKOUT_STATUS.DRAFTED
    },
    doneAt: { type: Date },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default (mongoose.models.Workout as mongoose.Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
