import {Request, Response, Application} from 'express';
import {UserController} from '../controllers/user-controller';
import { checkAuth } from '../middleware/check-auth';
import { ok } from '../utils/status-fun';

export class Routes {

    private userController = new UserController();

    constructor(private app: Application) {
        this.userRoutes();
        this.authRoutes();
        this.products();
    }

    private userRoutes(): void {
        this.app.post('/signup', this.userController.addNewAccount);
    }

    private authRoutes(): void {
        this.app.post('/authorize' , this.userController.auth)
    }

    private products() : void {
        
        this.app.route('/product')
        .get(checkAuth, (req: Request, res: Response) => {

            return ok(res, {
                message: 'All Products'
            });
        });
    }
}