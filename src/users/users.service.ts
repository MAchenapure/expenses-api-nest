import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create.user.request.dto';
import { LoginUserRequestDto } from './dto/login.user.request.dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY, UsersRepository } from './repository/users.repository.interface';
import { hash, compare } from '../service/hash.service'

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly _usersRepository: UsersRepository) { }

    async createUser(user: CreateUserRequestDto): Promise<User> {
        const password = await hash(user.password);
        user.password = password;
        return await this._usersRepository.createUser(user);
    }

    async login(loginUserDto: LoginUserRequestDto): Promise<User> {
        const dbUser: User = await this._usersRepository.login(loginUserDto);

        if (dbUser) {
            const result = await compare(loginUserDto.password, dbUser.password);

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
