import { Application } from "express";
import { UserRoutes } from "./user-routes";

export class Routes{

    constructor(app: Application) {
        new UserRoutes(app);
    }
}