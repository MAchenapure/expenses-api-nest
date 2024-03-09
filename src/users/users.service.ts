import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { LoginUserRequestDto } from './dto/login-user-.requestdto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY, UsersRepository } from './repository/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly _usersRepository: UsersRepository) { }

    async createUser(user: CreateUserRequestDto): Promise<User> {
        const saltRounds = 10;
        const password = await bcrypt.hash(user.password, saltRounds);
        user.password = password;
        return await this._usersRepository.createUser(user);
    }

    async login(loginUserDto: LoginUserRequestDto): Promise<User> {
        const dbUser: User = await this._usersRepository.login(loginUserDto);

        if (dbUser) {
            const result = await bcrypt.compare(loginUserDto.password, dbUser.password);

            if (result)
                return dbUser;
        }

        return null;
    }

    async deleteUserById(id: string): Promise<User> {
        const deletedUser = await this._usersRepository.deleteUserById(id);
        return deletedUser;
    }
}
