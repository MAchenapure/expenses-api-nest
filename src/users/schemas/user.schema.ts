import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
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

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Expense.name }])
    expenses: Expense;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type UserModel = Model<UserDocument>;
