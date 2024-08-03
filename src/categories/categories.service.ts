import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CATEGORIES_REPOSITORY, CategoriesRepository } from './repository/categories.repository.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(CATEGORIES_REPOSITORY) private readonly _categoriesRepository: CategoriesRepository,
        private readonly _usersService: UsersService
    ) { }

    createCategory = async (createCategoryDto: CreateCategoryDto): Promise<Category> => {
        const { idUser, description } = createCategoryDto;
        console.log(createCategoryDto);

        if (!idUser)
            throw new BadRequestException("Invalid User ID.");

        const user: User = await this._usersService.findById(idUser);

        if (!user)
            throw new BadRequestException("Invalid User ID.");


        const category: Category = await this._categoriesRepository.createCategory(new Category(description, idUser));

        if (!category)
            throw new InternalServerErrorException("An error occurred while trying to create the category.");

        return category;
    }
}
