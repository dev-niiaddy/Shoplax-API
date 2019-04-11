import { Application } from "express";
import { checkAuth } from "../middleware/check-auth";
import { ProductController } from "../controllers/product-controller";

export class ProductRoutes {
    
    private productController = new ProductController()

    constructor(private app: Application){
        this.init();
    }

    private init() {
        this.app.route('/product')

        //add a new product
        .post(checkAuth, this.productController.addProduct)

        //get all products
        .get(this.productController.allProducts);

        //get product with id
        this.app.route('/product/:productId')
        .get(this.productController.productWithId);
    }
}