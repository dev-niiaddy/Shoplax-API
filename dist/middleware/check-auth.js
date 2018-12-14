"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const status_fun_1 = require("../utils/status-fun");
exports.checkAuth = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, app_1.JWT_KEY);
        req.userData = decoded;
        console.log(decoded);
        next();
    }
    catch (err) {
        return status_fun_1.unAuthorized(res, {
            message: 'Auth Failed'
        });
    }
};
//# sourceMappingURL=check-auth.js.map