import { Document } from "mongoose";

export interface DRole extends Document{
    _id: string;
    role: string;
}
