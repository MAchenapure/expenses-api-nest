import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

@Schema()
class Expense {
    @Prop({ required: true })
    value: number;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({ required: true, type: Date, default: Date.now() })
    createdAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);