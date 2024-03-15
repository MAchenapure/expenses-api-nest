import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Schema()
class AuthUser {
    @Prop({ index: true, required: true })
    username: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: false })
    id: string;
}

export const AuthUsersSchema = SchemaFactory.createForClass(AuthUser);
export type AuthUserDocument = AuthUser & mongoose.Document;
export type AuthUserModel = Model<AuthUserDocument>;