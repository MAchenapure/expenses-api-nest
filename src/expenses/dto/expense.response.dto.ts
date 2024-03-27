import { BaseResponseDto } from "src/dtos/base.response.dto";
import { Expense } from "../entities/expense.entity";

export class ExpenseResponseDto extends BaseResponseDto {
    expenses?: Expense | Expense[];
}