import mongoose from 'mongoose';
import { ExerciseDocument } from './Exercise';
import { UserDocument } from './User';
import { WorkoutDocument } from './Workout';

export interface WorkoutExerciseType {
  workout: WorkoutDocument;
  exercise: ExerciseDocument;
  sets: {
    mins?: number;
    lbs?: number;
    reps?: number;
  }[];

  createdBy: UserDocument;
}

export interface WorkoutExerciseDocument
  extends WorkoutExerciseType,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutExerciseSchema = new mongoose.Schema(
  {
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: [
      {
        mins: { type: Number },
        lbs: { type: Number },
        reps: { type: Number }
      }
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default (mongoose.models
  .WorkoutExercise as mongoose.Model<WorkoutExerciseDocument>) ||
  mongoose.model<WorkoutExerciseDocument>(
    'WorkoutExercise',
    WorkoutExerciseSchema
  );
