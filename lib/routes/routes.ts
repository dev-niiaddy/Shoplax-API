import {Request, Response, Application} from 'express';
import {UserController} from '../controllers/userController';

export class Routes {

    private userControl = new UserController();

    constructor(private app: Application) {
        this.routes();
    }

    private routes() : void {
        
        this.app.route('/')
        .get((req: Request, res: Response) => {

            res.status(200).send({
                message: 'GET Request sucessfull.'
            });
        });


    }
}