import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { EXPENSES_REPOSITORY, ExpensesRepository } from './repository/expenses.repository.interface';
import { Expense } from './entities/expense.entity';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @Inject(EXPENSES_REPOSITORY) private readonly _expensesRepository: ExpensesRepository,
        private readonly _usersService: UsersService
    ) { }

    createExpense = async (createExpenseDto: CreateExpenseDto): Promise<Expense> => {
        const { idUser } = createExpenseDto;

        const user: User = await this._usersService.findById(idUser);
        if (!user)
            throw new BadRequestException("Invalid User ID.");

        const expense: Expense = await this._expensesRepository.createExpense(createExpenseDto);
        if (!expense)
            throw new InternalServerErrorException("An error occurred while trying to create the expense.");

        return expense;
    }

    deleteById = async (idExpense: string): Promise<Expense> => {
        const deletedExpense = await this._expensesRepository.deleteExpenseById(idExpense);
        if (!deletedExpense)
            throw new BadRequestException("Expense not found.");

        return deletedExpense;
    }

    findById = async (idExpense: string): Promise<Expense> => {
        const expense = await this._expensesRepository.findExpenseById(idExpense);
        if (!expense)
            throw new BadRequestException("Expense not found.");

        return expense;
    }

    findUserExpenses = async (idUser: string): Promise<Expense[]> => {
        const user: User = await this._usersService.findById(idUser);
        if (!user)
            throw new BadRequestException("Invalid User ID.");

        const expenses: Expense[] = await this._expensesRepository.findUserExpenses(idUser);
        return expenses;
    }

    updateExpense = async (idExpense: string, expense: UpdateExpenseDto): Promise<Expense> => {
        const updatedExpense = await this._expensesRepository.updateExpense(idExpense, expense);
        if (!updatedExpense)
            throw new BadRequestException("Invalid Expense ID.");

        return updatedExpense;
    }
}
