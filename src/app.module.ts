import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

const DB_USER = process.env.EXPENSES_DB_USER;
const DB_PASSWORD = process.env.EXPENSES_DB_PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/`),
    AuthModule,
    CategoriesModule,
    ExpensesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
