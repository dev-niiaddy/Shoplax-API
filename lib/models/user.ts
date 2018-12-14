import * as mongoose from 'mongoose';

const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: { ref: 'Role'},
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);