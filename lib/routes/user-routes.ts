import {Request, Response, Application} from 'express';
import {UserController} from '../controllers/user-controller';
import { checkAuth } from '../middleware/check-auth';
import { ok } from '../utils/status-fun';

export class UserRoutes {

    private userController = new UserController();

    constructor(private app: Application) {
        this.userRoutes();
        this.authRoutes();
    }

    private userRoutes(): void {
        this.app.post('/signup', this.userController.addNewAccount);
    }

    private authRoutes(): void {
        this.app.post('/authorize' , this.userController.auth)
    }
}