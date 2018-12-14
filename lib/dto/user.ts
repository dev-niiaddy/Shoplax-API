import { Document } from "mongoose";
import { DRole } from "./role";

export interface RegUser {
    firstName: string;
    lastName: string;
    password: string;
    confirmPas: string;
    email: string;
    phone: string;
    role: DRole;
}

export interface DUser extends Document{
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    role: DRole
    created_at: Date;
}