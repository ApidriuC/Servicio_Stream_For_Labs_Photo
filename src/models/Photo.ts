import mongoose, { Model, Schema } from 'mongoose';
import { IPhoto } from '../interfaces';

const PhotoSchema: Schema<IPhoto> = new Schema({
    name: {type: String, required: true},
    path: {type: String, required: true,  unique: true},
    weight: {type: Number, required: true},
    upload_at: {type: Date, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    shared_users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String, required: true },
    sync: { type: Boolean, default: false },
});


const Photo: Model<IPhoto> = mongoose.model('Photo', PhotoSchema);
export default Photo;
