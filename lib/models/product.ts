import * as mongoose from 'mongoose';
import { Schema } from '../app';

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

export const Product = mongoose.model('Product', ProductSchema);