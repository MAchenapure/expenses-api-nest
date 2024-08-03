import { BadRequestException, Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../entities/category.entity";
import { CategoryDocument, CategoryModel } from "../schemas/category.schema";
import mongoose from "mongoose";

@Injectable()
export class MongoCategoriesRepository implements CategoriesRepository {
    constructor(@InjectModel(Category.name) private readonly _categoryModel: CategoryModel) { }

    async createCategory(category: Category): Promise<Category> {
        const newCategory = await new this._categoryModel(category).save();
        return this._mapRawCategoryToCategory(newCategory);
    }

    async deleteCategoryById(id: string): Promise<Category> {
        this._validateMongoId(id);
        const category = await this._categoryModel.findByIdAndDelete(id);
        if (!category)
            return null;

        return this._mapRawCategoryToCategory(category);
    }

    async findUserCategories(idUser: string): Promise<Category[]> {
        let query: any = { idUser: idUser, isDefault: true };

        const categories = await this._categoryModel.find(query);
        if (!categories)
            return null;

        const formattedCategories = categories.map(category => this._mapRawCategoryToCategory(category));
        return formattedCategories;
    }

    private _mapRawCategoryToCategory(rawCategory: CategoryDocument): Category {
        const { id, idUser, description, isDefault } = rawCategory;

        const category = new Category(description, id, idUser, isDefault);

        return category;
    }

    private _validateMongoId(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new BadRequestException("Invalid Category ID.");

        return true;
    }

}