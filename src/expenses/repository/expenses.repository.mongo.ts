import { BadRequestException, Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository.interface";
import { Expense } from "../entities/expense.entity";
import { InjectModel } from "@nestjs/mongoose";
import { ExpenseDocument, ExpenseModel } from "../schemas/expense.schema";
import mongoose from "mongoose";

@Injectable()
export class MongoExpensesRepository implements ExpensesRepository {
    constructor(@InjectModel(Expense.name) private readonly _expensesModel: ExpenseModel) { }

    async createExpense(expense: Expense): Promise<Expense> {
        const newExpense = await new this._expensesModel(expense).save();
        return this._mapRawExpenseToExpense(newExpense);
    }

    async deleteExpenseById(id: string): Promise<Expense> {
        this._validateMongoId(id);
        const expense = await this._expensesModel.findByIdAndDelete(id);
        if (!expense)
            return null;

        return this._mapRawExpenseToExpense(expense);
    }

    async findExpenseById(id: string): Promise<Expense> {
        this._validateMongoId(id);
        const expense = await this._expensesModel.findById(id);
        if (!expense)
            return null;

        return this._mapRawExpenseToExpense(expense);
    }

    async findUserExpenses(idUser: string): Promise<Expense[]> {
        const expenses = await this._expensesModel.find({ idUser: idUser });
        if (!expenses)
            return null;

        const formattedExpenses = expenses.map(expense => this._mapRawExpenseToExpense(expense));
        return formattedExpenses;
    }

    async updateExpense(expense: Expense): Promise<Expense> {
        this._validateMongoId(expense.id);
        this._validateMongoId(expense.idUser);

        const originalExpense = await this.findExpenseById(expense.id);
        if (!originalExpense)
            return null;

        if (originalExpense.idUser != expense.idUser)
            throw new BadRequestException("Invalid User ID.");

        const updatedExpense = await this._expensesModel.findByIdAndUpdate(expense.id, expense, { new: true });
        if (!updatedExpense)
            return null;

        return this._mapRawExpenseToExpense(updatedExpense);
    }

    private _mapRawExpenseToExpense(rawExpense: ExpenseDocument): Expense {
        const { idUser, description, value, date, day, month, year, category, id, createdAt } = rawExpense;

        const expense = new Expense(idUser, description, value, date, day, month, year, category, id, createdAt);

        return expense;
    }

    private _validateMongoId(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new BadRequestException("Invalid Expense ID.");

        return true;
    }
}