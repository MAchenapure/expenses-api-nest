import { Controller, Post, Body, Param, Delete, HttpStatus, Get, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/create.user.request.dto';
import { LoginUserRequestDto } from './dto/login.user.request.dto';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) { }

    @Post('/create')
    async create(@Body() createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
        try {
            const user: User = await this._usersService.createUser(createUserDto);
            user.password = undefined;
            return {
                message: 'User created successfully.',
                user: user
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserRequestDto): Promise<UserResponseDto> {
        try {
            const user: User = await this._usersService.login(loginUserDto);
            user.password = undefined;
            return {
                message: 'Login successfully done.',
                user: user
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<UserResponseDto> {
        try {
            const deletedUser = await this._usersService.deleteUserById(id);
            deletedUser.password = undefined;
            return {
                message: 'User deleted successfully.',
                user: deletedUser
            }
        }
        catch (err) {
            throw err;
        }
    }
}
