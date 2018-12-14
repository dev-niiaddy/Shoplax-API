"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../models/role");
class DataInit {
    constructor(app) {
        this.app = app;
        this.initRole();
    }
    initRole() {
        role_1.Role.findOne({ role: 'USER' }, (err, role) => {
            if (role === null) {
                let userRole = new role_1.Role({
                    role: 'USER'
                });
                userRole.save((err, role) => {
                    console.log(role);
                });
            }
        });
        role_1.Role.findOne({ role: 'ADMIN' }, (err, role) => {
            if (role === null) {
                let adminRole = new role_1.Role({
                    role: 'ADMIN'
                });
                adminRole.save((err, role) => {
                    console.log(role);
                });
            }
        });
    }
}
exports.DataInit = DataInit;
//# sourceMappingURL=role-init.js.map