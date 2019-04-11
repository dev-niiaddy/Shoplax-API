import { RegUser, DUser } from "../dto/user";
import { Request, Response } from 'express';
import { User } from "../models/user";
import { Role } from "../models/role";
import { badRequest, created, notFound, unAuthorized, ok } from "../utils/status-fun";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DRole } from "../dto/role";

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

            if(err) {
                return badRequest(res, {
                    message: 'Signup Failed'
                });
            }
            
            regUser.password = hash;

            Role.findOne({ role: 'USER' }, (err, role) => {
                regUser.role = role as DRole;
    
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

        console.log(process.env.JWT_KEY);
        
        User.findOne( { email: req.body.email })
        .exec()
        .then( user => {

            let currUser = user as DUser

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
                        process.env.JWT_KEY,
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