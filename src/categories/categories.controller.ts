import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category.response.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly _categoriesService: CategoriesService) { }

    @Post('/create')
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        try {
            const categoryCreated = await this._categoriesService.createCategory(createCategoryDto);
            return {
                message: 'Category created successfully.',
                category: categoryCreated
            }
        } 
        catch(err) {
            throw err;
        }
    }
}
