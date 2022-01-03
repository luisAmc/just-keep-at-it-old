import mongoose from 'mongoose';
import User, { UserDocument } from './User';

interface SessionType {
  expiresAt: Date;
  user: UserDocument;
}

export interface SessionDocument extends SessionType, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    expiresAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User }
  },
  { timestamps: true }
);

export default (mongoose.models.Session as mongoose.Model<SessionDocument>) ||
  mongoose.model<SessionDocument>('Session', SessionSchema);
