import * as mongoose from 'mongoose';

const Schema = mongoose.Schema

export const RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});

export const Role = mongoose.model('Role', RoleSchema);