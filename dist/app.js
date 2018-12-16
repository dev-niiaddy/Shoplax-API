"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const role_init_1 = require("./bootstrap/role-init");
const routes_1 = require("./routes/routes");
class App {
    constructor() {
        this.mongoDBUrl = 'mongodb://localhost/shoplax';
        this.app = express();
        this.config();
        this.routes = new routes_1.Routes(this.app);
        this.mongoSetup();
        new role_init_1.DataInit(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.connect(this.mongoDBUrl, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    }
}
exports.default = new App().app;
exports.JWT_KEY = 'this-shop-is-impenetrable';
exports.Schema = mongoose.Schema;
//# sourceMappingURL=app.js.map