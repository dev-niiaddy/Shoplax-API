"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const status_fun_1 = require("../utils/status-fun");
const product_1 = require("../models/product");
class ProductController {
    addProduct(req, res) {
        let userData = req.userData;
        user_1.User.findOne({ email: userData.email })
            .exec()
            .then(user => {
            let currUser = user;
            if (currUser.role.role !== 'ADMIN') {
                return status_fun_1.unAuthorized(res, {
                    message: 'Operation not allowed'
                });
            }
            let newProduct = new product_1.Product(req.body);
            newProduct.save()
                .then(product => {
                console.log(product);
                return status_fun_1.created(res, {
                    message: 'Product added succesfully'
                });
            })
                .catch(err => {
                return status_fun_1.badRequest(res, err);
            });
        })
            .catch(err => {
            status_fun_1.badRequest(res, {
                message: 'Product cannot be added'
            });
        });
    }
    allProducts(req, res) {
        product_1.Product.find()
            .exec()
            .then(products => {
            return status_fun_1.ok(res, products);
        })
            .catch(err => {
            return status_fun_1.badRequest(res, err);
        });
    }
    productWithId(req, res) {
        product_1.Product.findOne({ _id: req.params.productId })
            .exec()
            .then(product => {
            if (!product) {
                return status_fun_1.notFound(res, {
                    message: 'Product not found'
                });
            }
            return status_fun_1.ok(res, product);
        })
            .catch(err => status_fun_1.badRequest(res, 'Error'));
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product-controller.js.map