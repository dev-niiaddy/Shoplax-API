import { Application } from "express";
import { UserRoutes } from "./user-routes";
import { ProductRoutes } from "./product-routes";

export class Routes{

    constructor(app: Application) {
        new UserRoutes(app);
        new ProductRoutes(app);
    }
}