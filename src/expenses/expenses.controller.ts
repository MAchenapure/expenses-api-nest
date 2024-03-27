import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';
import { ExpenseResponseDto } from './dto/expense.response.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly _expensesService: ExpensesService) { }

    @Post('/create')
    async create(@Body() createExpenseDto: CreateExpenseDto): Promise<ExpenseResponseDto> {
        try {
            const expenseCreated = await this._expensesService.createExpense(createExpenseDto);
            return {
                message: 'Expense successfully registered.',
                expenses: expenseCreated
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Get('/user/:id')
    async getUserExpenses(@Param('id') idUser: string): Promise<ExpenseResponseDto> {
        try {
            const expenses = await this._expensesService.findUserExpenses(idUser);

            return {
                message: 'Query successfully executed.',
                expenses: expenses
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Get('/get/:id')
    async getById(@Param('id') idExpense: string): Promise<ExpenseResponseDto> {
        try {
            const expense = await this._expensesService.findById(idExpense);

            return {
                message: 'Query successfully executed.',
                expenses: expense
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Delete('/delete/:id')
    async deleteById(@Param('id') id: string): Promise<ExpenseResponseDto> {
        try {
            const deletedExpense = await this._expensesService.deleteById(id);

            return {
                message: 'Expense successfully deleted.',
                expenses: deletedExpense
            };
        }
        catch (err) {
            throw err;
        }
    }

    @Put('/update/:id')
    async update(@Body() expense: UpdateExpenseDto, @Param('id') idExpense): Promise<ExpenseResponseDto> {
        try {
            const updatedExpense = await this._expensesService.updateExpense(idExpense, expense);

            return {
                message: 'Expense successfully updated.',
                expenses: updatedExpense
            }
        }
        catch (err) {
            throw err;
        }
    }
}
