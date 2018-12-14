import { Document } from "mongoose";

export interface DProduct extends Document {
    name: String;
    price: Number;
    quantity: Number;
    description: String;
    created_at: Date;
}

export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    description: string;
}