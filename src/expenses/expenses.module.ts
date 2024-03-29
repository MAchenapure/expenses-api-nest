import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './schemas/expense.schema';
import { Expense } from './entities/expense.entity';
import { UserSchema } from '../users/schemas/user.schema';
import { User } from '../users/entities/user.entity';
import { EXPENSES_REPOSITORY } from './repository/expenses.repository.interface';
import { MongoExpensesRepository } from './repository/expenses.repository.mongo';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Expense.name,
                schema: ExpenseSchema
            },
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        UsersModule
    ],
    controllers: [ExpensesController],
    providers: [
        ExpensesService,
        {
            provide: EXPENSES_REPOSITORY,
            useClass: MongoExpensesRepository
        }
    ],
})
export class ExpensesModule { }
