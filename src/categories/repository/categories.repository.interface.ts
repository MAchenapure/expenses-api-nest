import { Category } from '../entities/category.entity'

export const CATEGORIES_REPOSITORY = 'CategoriesRepository';

export interface CategoriesRepository {
    createCategory(category: Category): Promise<Category>;
    deleteCategoryById(id: string): Promise<Category>;
    findUserCategories(idUser: string): Promise<Category[]>;
}