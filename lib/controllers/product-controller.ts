import { Request, Response } from 'express';
import { badRequest, created, unAuthorized } from '../utils/status-fun';
import { DUser } from '../dto/user';
import { UserData } from '../middleware/check-auth';
import { Product } from '../models/product';
import { User } from '../models/user';

export class ProductController {

    public addProduct(req: Request, res: Response) {
        
        let userData = (req as any).userData as UserData;

        User.findOne({email: userData.email })
        .exec()
        .then( user => {
            let currUser = user as DUser;
        
            if(currUser.role.role !== 'ADMIN') {
                return unAuthorized(res, {
                    message: 'Not permited to add products'
                });
            }

            let newProduct = new Product(req.body);

            newProduct.save()
            .then(product => {
                console.log(product);

                return created(res, {
                    message: 'Product added'
                });
            })
            .catch( err => {
                return badRequest(res, {
                    message: 'Product cannot be added'
                })
            });
        
        })
        .catch( err => {
            return badRequest(res, {
                message: 'Product cannot be added'
            })
        });
    }
}