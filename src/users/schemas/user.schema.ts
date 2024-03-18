import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { ExpenseDocument } from "../../expenses/schemas/expense.schema";

@Schema()
class User {
    @Prop({ index: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true, type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }] })
    expenses: ExpenseDocument[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
