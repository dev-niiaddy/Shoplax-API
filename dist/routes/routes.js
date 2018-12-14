"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user-controller");
const check_auth_1 = require("../middleware/check-auth");
const status_fun_1 = require("../utils/status-fun");
class Routes {
    constructor(app) {
        this.app = app;
        this.userController = new user_controller_1.UserController();
        this.userRoutes();
        this.authRoutes();
        this.products();
    }
    userRoutes() {
        this.app.post('/signup', this.userController.addNewAccount);
    }
    authRoutes() {
        this.app.post('/authorize', this.userController.auth);
    }
    products() {
        this.app.route('/product')
            .get(check_auth_1.checkAuth, (req, res) => {
            return status_fun_1.ok(res, {
                message: 'All Products'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map