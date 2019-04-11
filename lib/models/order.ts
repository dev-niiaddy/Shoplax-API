import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Types = mongoose.Schema.Types;

const Order = new Schema({
    products: {
        type: Types.Array,
    },
    address: {
        
    }
});