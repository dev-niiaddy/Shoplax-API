import { RegUser } from "../dto/reg-user-dto";
import { Request, Response } from 'express';
import { User } from "../models/user";
import { Role } from "../models/role";
import { URole } from "../models/role";
import { badRequest, created, notFound, unAuthorized, ok } from "../utils/status-fun";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from "../app";

const salt: number = 10;

export class UserController {
    
    public addNewAccount(req: Request, res: Response) {

        let regUser: RegUser = req.body as unknown as RegUser
        
        if(regUser.password !== regUser.confirmPas) {
            return badRequest(res,{
                message: 'Password and Confirm Password do not match'
            });
        }
        
        bcrypt.hash(regUser.confirmPas, salt, (err, hash) => {

            regUser.password = hash;

            Role.findOne({ role: 'USER' }, (err, role) => {
                regUser.role = role as unknown as URole;
    
                let newUser = new User(regUser);
    
                newUser.save()
                .then( user => {
                    return created(res, {
                        message: 'User Created'
                    });
                })
                .catch( err => {
                    return badRequest(res, err)
                });
            });
        });
    }

    public auth(req: Request, res: Response) {
        User.findOne( { email: req.body.email })
        .exec()
        .then( user => {

            let currUser = user as any

            if(!currUser) {
                return unAuthorized(res, {
                    message: 'Auth Failed'
                });
            }

            bcrypt.compare(req.body.password, currUser.password, (err, same) => {

                if(err || !same) {
                    return unAuthorized(res, {
                        message: 'Auth Failed'
                    });
                }

                if(same) {

                    let token = jwt.sign({
                        email: currUser.email,
                        userId: currUser.id 
                    }, 
                        JWT_KEY,
                    {
                        expiresIn: '1h' 
                    });

                    return ok(res, {
                        message: 'Auth successful',
                        token: token
                    });
                }
            });
            
        })
        .catch((err) => notFound(res, {
            message: 'Mail not found user does not exist'
        }));
    }
}