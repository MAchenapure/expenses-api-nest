import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Schema()
class Category {
    @Prop({required: true})
    idUser: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    isDefault: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & mongoose.Document;
export type CategoryModel = Model<CategoryDocument>;