import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document, Model } from "mongoose";
import { Expense } from "src/expenses/entities/expense.entity";

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
    expenses: Expense[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
