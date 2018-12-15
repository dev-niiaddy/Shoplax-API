"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_auth_1 = require("../middleware/check-auth");
const product_controller_1 = require("../controllers/product-controller");
class ProductRoutes {
    constructor(app) {
        this.app = app;
        this.productController = new product_controller_1.ProductController();
        this.init();
    }
    init() {
        this.app.route('/product')
            //add a new product
            .post(check_auth_1.checkAuth, this.productController.addProduct)
            //get all products
            .get(this.productController.allProducts);
        //get product with id
        this.app.route('/product/:productId')
            .get(this.productController.productWithId);
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=product-routes.js.map