"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = require("./user-routes");
const product_routes_1 = require("./product-routes");
class Routes {
    constructor(app) {
        new user_routes_1.UserRoutes(app);
        new product_routes_1.ProductRoutes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map