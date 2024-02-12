import { Controller, Post, Body, Param, Delete, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { ApiException } from 'src/errors/api.exception';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) { }

    @Get()
    async findAll() {
        try {
            const users = await this._usersService.findAll();
            
            return {
                message: 'User successfully created.',
                user: users
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }
    
    @Post('/create')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const userCreated = await this._usersService.createUser(createUserDto);
            userCreated.password = undefined;

            return {
                message: 'User successfully created.',
                user: userCreated
            }
            
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            let user: User = await this._usersService.login(loginUserDto);

            if (user) user.password = undefined;

            return {
                success: !!user,
                user: user
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        try {
            const deletedUser = await this._usersService.deleteUserById(id);

            if (!deletedUser) {
                throw new ApiException("UserError", "not-found", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else {
                deletedUser.password = undefined;
            }

            return {
                message: 'User successfully deleted.',
                user: deletedUser
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }
}
