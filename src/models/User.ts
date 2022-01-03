import mongoose from 'mongoose';
import { WorkoutDocument } from './Workout';

interface UserType {
  username: string;
  name: string;
  hashedPassword?: Buffer;

  workouts: WorkoutDocument[];
}

export interface UserDocument extends UserType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hashedPassword: { type: Buffer },

    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }]
  },
  { timestamps: true }
);

export default (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', UserSchema);
