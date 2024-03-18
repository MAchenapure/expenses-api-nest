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
            const user = await this._usersService.createUser(createUserDto);

            if (user) {
                user.password = undefined;
                return {
                    code: 0,
                    message: 'User created successfully.',
                    user: user
                }
            }
            else {
                return {
                    code: 1,
                    message: 'User already exists.'
                }
            }
        }
        catch (err) {
            throw new InternalServerErrorException();
        }
    }

    @Post('/login')
    async login(@Body() loginUserDto: LoginUserRequestDto): Promise<UserResponseDto> {
        try {
            let user: User = await this._usersService.login(loginUserDto);

            if (user) {
                user.password = undefined;
                return {
                    code: 0,
                    message: 'Login successfully done.',
                    user: user
                }
            }
            else {
                return {
                    code: 1,
                    message: 'Login failed.'
                }
            }
        }
        catch (err) {
            throw new InternalServerErrorException();
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string): Promise<UserResponseDto> {
        try {
            const deletedUser = await this._usersService.deleteUserById(id);

            if (deletedUser) {
                deletedUser.password = undefined;
                return {
                    code: 0,
                    message: 'User deleted successfully.',
                    user: deletedUser
                }
            }
            else {
                return {
                    code: 1,
                    message: 'User not found.'
                }
            }
        }
        catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
