import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
