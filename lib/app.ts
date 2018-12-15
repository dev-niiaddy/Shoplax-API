import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { DataInit } from "./bootstrap/role-init";
import { Routes } from "./routes/routes";

class App {

    public app: express.Application;

    private routes: Routes;

    private mongoDBUrl: string = 'mongodb://localhost/shoplax';

    constructor() {
        this.app = express();
        this.config();
        this.routes = new Routes(this.app);
        this.mongoSetup();
        new DataInit(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoDBUrl, { 
            useNewUrlParser: true ,
            useCreateIndex: true
        });
    }
}

export default new App().app;

export const JWT_KEY = 'this-shop-is-impenetrable';

export const Schema  = mongoose.Schema;