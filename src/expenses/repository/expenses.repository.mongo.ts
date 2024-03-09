import { HttpStatus, Injectable } from "@nestjs/common";
import { ExpensesRepository } from "./expenses.repository";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { Expense } from "../entities/expense.entity";
import { InjectModel } from "@nestjs/mongoose";
import { ExpenseDocument, ExpenseModel } from "../schemas/expense.schema";
import mongoose, { Model } from "mongoose";
import { ApiException } from "src/errors/api.exception";
import { UserModel } from "src/users/schemas/user.schema";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class MongoExpensesRepository implements ExpensesRepository {
    constructor(
        @InjectModel(Expense.name) private readonly _expensesModel: ExpenseModel,
        @InjectModel(User.name) private readonly _usersModel: UserModel,
    ) { }

    async createExpense({ idUser, ...createExpenseDto }: CreateExpenseDto): Promise<Expense> {
        this._validateMongoUserId(idUser);
        const findedUser = await this._usersModel.findById(idUser);
        if (!findedUser) throw new ApiException("UserError", "not-found", HttpStatus.NOT_FOUND);
        const newExpense = await new this._expensesModel(createExpenseDto).save();
        await findedUser.updateOne({
            $push: {
                expenses: newExpense._id
            }
        });
        return this._mapRawExpenseToExpense(newExpense);
    }
    deleteExpenseById(id: string): Promise<Expense> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Expense[]> {
        throw new Error("Method not implemented.");
    }
    findExpenseById(id: string): Promise<Expense> {
        throw new Error("Method not implemented.");
    }

    async findUserExpenses(idUser: string): Promise<Expense[]> {
        this._validateMongoUserId(idUser);
        const findedUser = await this._usersModel.findById(idUser).populate('expenses');
        if (!findedUser) throw new ApiException("UserError", "not-found", HttpStatus.NOT_FOUND);
        const expenses: Expense[] = findedUser.expenses.map(expense => this._mapRawExpenseToExpense(expense));
        return expenses;
    }

    updateExpense(id: string, expense: CreateExpenseDto): Promise<Expense> {
        throw new Error("Method not implemented.");
    }

    private _mapRawExpenseToExpense(rawExpense: ExpenseDocument): Expense {
        const expense = new Expense();

        expense.id = rawExpense.id;
        expense.description = rawExpense.description;
        expense.value = rawExpense.value;
        expense.date = rawExpense.date;
        expense.category = rawExpense.category;
        expense.createdAt = rawExpense.createdAt;

        return expense;
    }

    private _validateMongoUserId(id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid)
            throw new ApiException("UserError", "not-found", HttpStatus.NOT_FOUND);
    }

    private _validateMongoExpenseId(id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);

        if (!isValid)
            throw new ApiException("ExpenseError", "not-found", HttpStatus.NOT_FOUND);
    }
}