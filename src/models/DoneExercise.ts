import mongoose from 'mongoose';
import { ExerciseDocument } from './Exercise';
import { UserDocument } from './User';
import { WorkoutDocument } from './Workout';

export interface DoneExerciseType {
  workout: WorkoutDocument;
  exercise: ExerciseDocument;
  sets: number[];

  createdBy: UserDocument;
}

export interface DoneExerciseDocument
  extends DoneExerciseType,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const DoneExerciseSchema = new mongoose.Schema(
  {
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
    sets: [{ type: Number }],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false
    }
  }
);

export default (mongoose.models
  .DoneExercise as mongoose.Model<DoneExerciseDocument>) ||
  mongoose.model<DoneExerciseDocument>('DoneExercise', DoneExerciseSchema);
