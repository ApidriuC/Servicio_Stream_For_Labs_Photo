import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: false, unique: true},
  oaid: { type: String, required: false },
  isAdmin: { type: Boolean, default:false },
  password: {type: String, required: false},
  sync_hour:{type: Date, required: false}
});


const User: Model<IUser> = mongoose.model('User', UserSchema);
export default User;
