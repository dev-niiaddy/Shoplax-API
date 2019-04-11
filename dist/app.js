"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const role_init_1 = require("./bootstrap/role-init");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        // private mongoDBUrl: string = `mongodb://tonystark:${process.env.MONGO_ATLAS_PW}@shoplaxcluster-shard-00-00-lumdn.mongodb.net:27017,shoplaxcluster-shard-00-01-lumdn.mongodb.net:27017,shoplaxcluster-shard-00-02-lumdn.mongodb.net:27017/test?ssl=true&replicaSet=ShoplaxCluster-shard-0&authSource=admin&retryWrites=true`;
        this.mongoDBUrl = "mongodb://localhost:27017/shoplax";
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes = new routes_1.Routes(this.app);
        this.errorHandlers();
        new role_init_1.DataInit(this.app);
    }
    config() {
        //use morgan to log incoming requests to server
        this.app.use(morgan("dev"));
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === 'OPTIONS') {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }
            next();
        });
    }
    mongoSetup() {
        mongoose.connect(this.mongoDBUrl, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    }
    errorHandlers() {
        this.app.use((req, res, next) => {
            let error = new Error("Not found");
            error.status = 404;
            next(error);
        });
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                error: {
                    message: err.message
                }
            });
        });
    }
}
exports.default = new App().app;
exports.Schema = mongoose.Schema;
//# sourceMappingURL=app.js.map