import { CreateExpenseDto } from "../dto/create-expense.dto";
import { Expense } from "../entities/expense.entity";

export const EXPENSES_REPOSITORY = 'ExpensesRepository';

export interface ExpensesRepository {
    createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense>;
    deleteExpenseById(id: string): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    findExpenseById(id: string): Promise<Expense>;
    findUserExpenses(idUser: string): Promise<Expense[]>;
    updateExpense(id: string, expense: CreateExpenseDto): Promise<Expense>;
}

