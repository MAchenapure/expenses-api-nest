import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create.user.request.dto';
import { LoginUserRequestDto } from './dto/login.user.request.dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY, UsersRepository } from './repository/users.repository.interface';
import { hash, compare } from '../services/hash.service'

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly _usersRepository: UsersRepository) { }

    async createUser(userDto: CreateUserRequestDto): Promise<User> {
        const password = await hash(userDto.password);
        userDto.password = password;
        const user = await this._usersRepository.createUser(userDto);
        if (!user)
            throw new InternalServerErrorException("An error ocurred while trying to create the user.")

        return user;
    }

    async deleteUserById(id: string): Promise<User> {
        const deletedUser = await this._usersRepository.deleteUserById(id);
        if (!deletedUser)
            throw new BadRequestException("User not found.");

        return deletedUser;
    }

    async findById(id: string): Promise<User> {
        const user = await this._usersRepository.findById(id);
        if (!user)
            throw new BadRequestException("Invalid User ID.");
        return user;
    }

    async login(loginUserDto: LoginUserRequestDto): Promise<User> {
        const dbUser: User = await this._usersRepository.findByEmail(loginUserDto.email);
        if (!dbUser)
            throw new BadRequestException("Login failed.");

        const passComparison = await compare(loginUserDto.password, dbUser.password);
        if (!passComparison)
            throw new BadRequestException("Login failed.");

        return dbUser;
    }
}
