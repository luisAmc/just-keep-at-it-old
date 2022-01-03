import mongoose from 'mongoose';
import { EXERCISE_TYPE, MUSCLE_GROUP } from 'src/resolvers/ExercisesResolver';

export interface ExerciseType {
  name: string;
  type: EXERCISE_TYPE;
  muscleGroup?: MUSCLE_GROUP;
}

export interface ExerciseDocument extends ExerciseType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: EXERCISE_TYPE, default: EXERCISE_TYPE.AEROBIC },
    muscleGroup: { type: String, enum: MUSCLE_GROUP }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false
    }
  }
);

export default (mongoose.models.Exercise as mongoose.Model<ExerciseDocument>) ||
  mongoose.model<ExerciseDocument>('Exercise', ExerciseSchema);
