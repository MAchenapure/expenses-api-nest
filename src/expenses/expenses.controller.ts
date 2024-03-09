import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesService } from './expenses.service';
import { ApiException } from 'src/errors/api.exception';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly _expensesService: ExpensesService) { }

    @Post('/create')
    async create(@Body() newExpense: CreateExpenseDto) {
        try {
            const expenseCreated = await this._expensesService.createExpense(newExpense);

            return {
                message: 'Expense successfully created.',
                expense: expenseCreated
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Delete('/delete/:id')
    async deleteById(@Param('id') id: string) {
        try {
            const deletedExpense = await this._expensesService.deleteById(id);

            if (!deletedExpense) throw new ApiException("ExpenseError", "not-found", HttpStatus.INTERNAL_SERVER_ERROR);

            return {
                message: 'Expense successfully deleted.',
                expense: deletedExpense
            };
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Get('/find')
    async findUserExpenses(@Query('user') user: string): Promise<{ message: string, expenses: Expense[] }> {
        try {
            const expenses = await this._expensesService.findUserExpenses(user);

            return {
                message: 'Query successfully executed.',
                expenses: expenses
            }

        }
        catch (err) {
            console.log(err);
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Put('/update')
    async update(@Body() expense: CreateExpenseDto, @Query('expenseId') expenseId) {
        try {
            const updatedExpense = await this._expensesService.udpate(expenseId, expense);

            if (!updatedExpense) throw new ApiException("ExpenseError", "not-found", HttpStatus.INTERNAL_SERVER_ERROR);

            return {
                message: 'Expense successfully updated.',
                expense: updatedExpense
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        try {
            const expense = await this._expensesService.findById(id);

            if (!expense) throw new ApiException("ExpenseError", "not-found", HttpStatus.INTERNAL_SERVER_ERROR);

            return {
                message: 'Query successfully executed.',
                expenses: expense
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Get()
    async findAll() {
        try {
            console.log("ASDASDASDAS")
            const expenses = await this._expensesService.findAll();

            return {
                message: 'Query successfully executed.',
                expenses: expenses
            }
        }
        catch (err) {
            console.log(err)
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }
}
