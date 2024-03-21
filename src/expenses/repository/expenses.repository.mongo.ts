import { BadRequestException, Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository.interface";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { Expense } from "../entities/expense.entity";
import { InjectModel } from "@nestjs/mongoose";
import { ExpenseDocument, ExpenseModel } from "../schemas/expense.schema";
import mongoose from "mongoose";
import { UpdateExpenseDto } from "../dto/update-expense.dto";

@Injectable()
export class MongoExpensesRepository implements ExpensesRepository {
    constructor(@InjectModel(Expense.name) private readonly _expensesModel: ExpenseModel) { }

    async createExpense({ ...createExpenseDto }: CreateExpenseDto): Promise<Expense> {
        const newExpense = await new this._expensesModel(createExpenseDto).save();
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

    async updateExpense(id: string, expense: UpdateExpenseDto): Promise<Expense> {
        this._validateMongoId(id);
        const updatedExpense = await this._expensesModel.findByIdAndUpdate(id, expense, { new: true });
        if (!updatedExpense)
            return null;

        return this._mapRawExpenseToExpense(updatedExpense);
    }

    private _mapRawExpenseToExpense(rawExpense: ExpenseDocument): Expense {
        const expense = new Expense();

        expense.id = rawExpense.id;
        expense.description = rawExpense.description;
        expense.value = rawExpense.value;
        expense.date = rawExpense.date;
        expense.category = rawExpense.category;
        expense.createdAt = rawExpense.createdAt;
        expense.idUser = rawExpense.idUser;

        return expense;
    }

    private _validateMongoId(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new BadRequestException("Invalid Expense ID.");

        return true;
    }
}