import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from 'mongoose';

class App {

    public app: express.Application;

    private routes: Routes;

    private mongoDBUrl: string = 'mongodb://localhost/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.routes = new Routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoDBUrl, { useNewUrlParser: true });
    }
}

export default new App().app;