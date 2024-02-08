import { Injectable } from '@nestjs/common';
import { IExpense } from './interfaces/expense.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
    constructor(@InjectModel('Expense') private readonly expenseModel: Model<IExpense>) { }

    create = async (expense: CreateExpenseDto): Promise<IExpense> => {
        const newExpense = new this.expenseModel(expense);
        return await newExpense.save();
    }

    deleteById = async (expenseId: string): Promise<IExpense> => {
        const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId);
        return deletedExpense;
    }

    findAll = async (): Promise<IExpense[]> => {
        return await this.expenseModel.find();
    }

    findById = async (expenseId: string): Promise<IExpense> => {
        const expense = await this.expenseModel.findById(expenseId);
        return expense;
    }

    udpate = async (expenseId: string, expense: CreateExpenseDto): Promise<IExpense> => {
        const updatedExpense = await this.expenseModel.findByIdAndUpdate(expenseId, expense, { new: true });
        return updatedExpense;
    }
}
