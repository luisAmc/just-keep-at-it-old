import mongoose from 'mongoose';
import { WORKOUT_STATUS } from 'src/resolvers/WorkoutsResolvers';
import DoneExercise, { DoneExerciseDocument } from './DoneExercise';
import Exercise, { ExerciseDocument } from './Exercise';
import { UserDocument } from './User';

export interface WorkoutType {
  name: string;
  exercises: ExerciseDocument[];
  doneExercises: DoneExerciseDocument[];

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
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: Exercise }],
    doneExercises: [
      { type: mongoose.Schema.Types.ObjectId, ref: DoneExercise }
    ],

    status: {
      type: String,
      enum: WORKOUT_STATUS,
      default: WORKOUT_STATUS.DRAFTED
    },
    doneAt: { type: Date },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

export default (mongoose.models.Workout as mongoose.Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>('Workout', WorkoutSchema);
