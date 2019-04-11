import { Request, Response } from "express";
import { UserData } from "../middleware/check-auth";
import { User } from "../models/user";
import { badRequest, unAuthorized, created, ok, notFound } from "../utils/status-fun";
import { DUser } from "../dto/user";
import { Product } from "../models/product";

export class ProductController {

    public addProduct(req: Request, res: Response) {
        
        let userData: UserData = (req as any).userData as UserData;

        User.findOne({email: userData.email })
        .exec()
        .then( user => {
            let currUser = user as DUser;

            if(currUser.role.role !== 'ADMIN'){
                return unAuthorized(res, {
                    message: 'Operation not allowed'
                });
            }

            let newProduct = new Product(req.body);

            newProduct.save()
            .then( product => {
                console.log(product);
                return created(res, {
                    message: 'Product added succesfully'
                })
            })
            .catch( err => {
                return badRequest(res, err);
            })
            
        })
        .catch( err => {
            badRequest(res, {
                message: 'Product cannot be added'
            });
        });
    }

    public allProducts(req: Request, res: Response) {
        Product.find()
        .exec()
        .then(products => {
            return ok(res, products);
        })
        .catch(err => {
            return badRequest(res, err);
        })
    }

    public productWithId(req: Request, res: Response) {
        
        Product.findOne({ _id: req.params.productId })
        .exec()
        .then( product => {
            if(!product) {
                return notFound(res, {
                    message: 'Product not found'
                })
            }

            return ok(res, product);
        })
        .catch( err => badRequest(res, 'Error'));
    }
}