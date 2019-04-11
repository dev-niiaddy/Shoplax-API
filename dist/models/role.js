"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.RoleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
});
exports.Role = mongoose.model('Role', exports.RoleSchema);
//# sourceMappingURL=role.js.map