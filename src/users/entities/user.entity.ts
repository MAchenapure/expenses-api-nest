import { Expense } from "../../expenses/entities/expense.entity";

export class User {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    createdAt: Date;
    expenses: Expense[];
}