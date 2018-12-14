"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./user-routes");
class Routes {
    constructor(app) {
        new user_routes_1.UserRoutes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map