import { Request, Response } from "express";
import { UserData } from "../middleware/check-auth";
import { User } from "../models/user";
import { badRequest, unAuthorized } from "utils/status-fun";
import { DUser } from "../dto/user";

export class ProductController {

    public addProduct(req: Request, res: Response) {
        
        let userData: UserData = (req as any).userData as UserData;

        User.findOne({email: userData.email })
        .exec()
        .then( user => {
            let currUser = user as DUser;

            
        })
        .catch( err => badRequest(res, {
            message: 'Product cannot be added'
        }));
    }
}