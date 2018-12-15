import * as mongoose from 'mongoose';
import { Schema } from '../app';

const Types = mongoose.Types;

const Order = new Schema({
    products: {
        type: Types.Array
    },
    
});