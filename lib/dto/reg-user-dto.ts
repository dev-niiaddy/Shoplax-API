import { URole } from "../models/role";

export class RegUser {
    firstName: string;
    lastName: string;
    password: string;
    confirmPas: string;
    email: string;
    phone: string;
    role: URole
}
