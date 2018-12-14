import { Application } from "express";
import { Role } from "../models/role";

export class DataInit {

    constructor(private app: Application) {
        this.initRole();
    }

    private initRole() {
        
        Role.findOne({role: 'USER'}, (err, role) => {
            if(role === null) {

                let userRole = new Role({
                    role: 'USER'
                });

                userRole.save((err, role) => {
                    console.log(role);
                })
            }
        });

        Role.findOne({role: 'ADMIN'}, (err, role) => {
            if(role === null) {

                let adminRole = new Role({
                    role: 'ADMIN'
                });

                adminRole.save((err, role) => {
                    console.log(role);
                })
            }
        });
    }
}