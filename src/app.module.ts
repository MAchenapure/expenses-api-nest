import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/expenses-api'),
    ExpensesModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
