import { Document } from "mongoose";

export interface IExpense extends Document { 
    value: number;
    date: Date;
}