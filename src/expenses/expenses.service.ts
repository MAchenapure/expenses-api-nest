import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { EXPENSES_REPOSITORY, ExpensesRepository } from './repository/expenses.repository';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
    constructor(@Inject(EXPENSES_REPOSITORY) private readonly _expensesRepository: ExpensesRepository) { }

    createExpense = async (createExpenseDto: CreateExpenseDto): Promise<Expense> => {
        const newExpense = await this._expensesRepository.createExpense(createExpenseDto);
        return newExpense;
    }

    deleteById = async (expenseId: string): Promise<Expense> => {
        throw new NotImplementedException();
        // const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId);
        // return deletedExpense;
    }

    findAll = async (): Promise<Expense[]> => {
        throw new NotImplementedException();

        // return await this.expenseModel.find();
    }

    findById = async (expenseId: string): Promise<Expense> => {
        throw new NotImplementedException();

        // const expense = await this.expenseModel.findById(expenseId);
        // return expense;
    }

    udpate = async (expenseId: string, expense: CreateExpenseDto): Promise<Expense> => {
        throw new NotImplementedException();

        // const updatedExpense = await this.expenseModel.findByIdAndUpdate(expenseId, expense, { new: true });
        // return updatedExpense;
    }
}
