import * as mongoose from 'mongoose';
import { Schema } from '../app';

export const RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

export const Role = mongoose.model('Role', RoleSchema);