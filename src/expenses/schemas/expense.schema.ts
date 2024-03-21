import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Schema()
class Expense {
    @Prop({ required: true })
    idUser: string;
    
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    value: number;

    @Prop({ required: true, type: Date, default: Date.now() })
    date: Date;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true, type: Date, default: Date.now() })
    createdAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
export type ExpenseDocument = Expense & mongoose.Document;
export type ExpenseModel = Model<ExpenseDocument>;