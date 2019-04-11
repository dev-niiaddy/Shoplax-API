"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user-model");
const status_fun_1 = require("../utils/status-fun");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app_1 = require("../app");
const salt = 10;
class UserController {
    addNewAccount(req, res) {
        let regUser = req.body;
        if (regUser.password !== regUser.confirmPas) {
            return status_fun_1.badRequest(res, {
                message: 'Password and Confirm Password do not match'
            });
        }
        bcrypt.hash(regUser.confirmPas, salt, (err, hash) => {
            regUser.password = hash;
            user_model_1.Role.findOne({ role: 'USER' }, (err, role) => {
                regUser.role = role;
                let newUser = new user_model_1.User(regUser);
                newUser.save()
                    .then(user => {
                    return status_fun_1.created(res, {
                        message: 'User Created'
                    });
                })
                    .catch(err => {
                    return status_fun_1.badRequest(res, err);
                });
            });
        });
    }
    auth(req, res) {
        user_model_1.User.findOne({ email: req.body.email })
            .exec()
            .then(user => {
            let currUser = user;
            if (!currUser) {
                return status_fun_1.unAuthorized(res, {
                    message: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, currUser.password, (err, same) => {
                if (err || !same) {
                    return status_fun_1.unAuthorized(res, {
                        message: 'Auth Failed'
                    });
                }
                if (same) {
                    let token = jwt.sign({
                        email: currUser.email,
                        userId: currUser.id
                    }, app_1.JWT_KEY, {
                        expiresIn: '1h'
                    });
                    return status_fun_1.ok(res, {
                        message: 'Auth successful',
                        token: token
                    });
                }
                return status_fun_1.unAuthorized(res, {
                    message: 'Auth Failed'
                });
            });
        })
            .catch((err) => status_fun_1.notFound(res, {
            message: 'Mail not found user does not exist'
        }));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map