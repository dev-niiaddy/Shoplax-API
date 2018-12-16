"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;
const Order = new Schema({
    products: {
        type: Types.Array
    },
});
//# sourceMappingURL=order.js.map