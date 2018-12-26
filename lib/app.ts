import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import { DataInit } from "./bootstrap/role-init";
import { Routes } from "./routes/routes";
import { NextFunction, Response, Request } from "express";

class App {
  public app: express.Application;

  private routes: Routes;

  // private mongoDBUrl: string = `mongodb://tonystark:${process.env.MONGO_ATLAS_PW}@shoplaxcluster-shard-00-00-lumdn.mongodb.net:27017,shoplaxcluster-shard-00-01-lumdn.mongodb.net:27017,shoplaxcluster-shard-00-02-lumdn.mongodb.net:27017/test?ssl=true&replicaSet=ShoplaxCluster-shard-0&authSource=admin&retryWrites=true`;

  private mongoDBUrl: string = "mongodb://localhost:27017/shoplax";

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routes = new Routes(this.app);
    this.errorHandlers();
    new DataInit(this.app);
  }

  private config(): void {
    //use morgan to log incoming requests to server
    this.app.use(morgan("dev"));

    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if(req.method === 'OPTIONS') {
          res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
          return res.status(200).json({});
      }

      next();
    });
  }

  private mongoSetup(): void {
    mongoose.connect(
      this.mongoDBUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true 
      }
    );
  }

  private errorHandlers(): void {
    this.app.use((req , res , next) => {
      let error = new Error("Not found");
      (error as any).status = 404;
      next(error);
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status((err as any).status || 500);
        res.json({
          error: {
            message: err.message
          }
        });
      }
    );
  }
}

export default new App().app;

export const Schema = mongoose.Schema;
