import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_KEY } from '../app';
import { unAuthorized } from '../utils/status-fun';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    
    try{
        
        let token = req.headers.authorization.split(" ")[1];
    
         let decoded = jwt.verify(token, JWT_KEY);
         (req as any).userData = decoded;
         console.log(decoded);
         next();

    }catch(err) {
        return unAuthorized(res, {
            message: 'Auth Failed'
        });
    }

};

export interface UserData {
    email: string;
    userId: string;
    expiresIn: number;
    ias: number;
}