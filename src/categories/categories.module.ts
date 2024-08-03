import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { CategorySchema } from './schemas/category.schema';
import { UsersModule } from 'src/users/users.module';
import { CATEGORIES_REPOSITORY } from './repository/categories.repository.interface';
import { MongoCategoriesRepository } from './repository/categories.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ]),
    UsersModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService,
    {
      provide: CATEGORIES_REPOSITORY,
      useClass: MongoCategoriesRepository
    }
  ]
})
export class CategoriesModule { }
