import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY, UsersRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly _usersRepository: UsersRepository) { }

    async createUser(user: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const password = await bcrypt.hash(user.password, saltRounds);
        user.password = password;
        return await this._usersRepository.createUser(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {
        let responseUser: User;
        const dbUser: User = await this._usersRepository.login(loginUserDto);

        if (dbUser) {
            const result = await bcrypt.compare(loginUserDto.password, dbUser.password);

            if (result) responseUser = dbUser;
        }

        return responseUser;
    }

    async deleteUserById(id: string) {
        const deletedUser = await this._usersRepository.deleteById(id);
        return deletedUser;
    }
}
