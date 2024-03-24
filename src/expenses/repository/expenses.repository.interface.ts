import { CreateExpenseDto } from "../dto/create-expense.dto";
import { UpdateExpenseDto } from "../dto/update-expense.dto";
import { Expense } from "../entities/expense.entity";

export const EXPENSES_REPOSITORY = 'ExpensesRepository';

export interface ExpensesRepository {
    createExpense(expense: Expense): Promise<Expense>;
    deleteExpenseById(id: string): Promise<Expense>;
    findExpenseById(id: string): Promise<Expense>;
    findUserExpenses(idUser: string): Promise<Expense[]>;
    updateExpense(id: string, expense: UpdateExpenseDto): Promise<Expense>;
}

