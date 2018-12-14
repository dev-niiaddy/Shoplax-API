import { Request, Response } from "express";
import { UserData } from "../middleware/check-auth";
import { User } from "../models/user";
import { badRequest, unAuthorized, created } from "utils/status-fun";
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
                return badRequest(res, {
                    message: 'Product not added'
                });
            })
            
        })
        .catch( err => {
            badRequest(res, {
                message: 'Product cannot be added'
            });
        });
    }
}