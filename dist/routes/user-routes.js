"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user-controller");
class UserRoutes {
    constructor(app) {
        this.app = app;
        this.userController = new user_controller_1.UserController();
        this.userRoutes();
        this.authRoutes();
    }
    userRoutes() {
        this.app.post('/signup', this.userController.addNewAccount);
    }
    authRoutes() {
        this.app.post('/authorize', this.userController.auth);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user-routes.js.map