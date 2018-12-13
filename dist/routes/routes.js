"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
class Routes {
    constructor(app) {
        this.app = app;
        this.userControl = new userController_1.UserController();
        this.routes();
    }
    routes() {
        this.app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET Request sucessfull.'
            });
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map