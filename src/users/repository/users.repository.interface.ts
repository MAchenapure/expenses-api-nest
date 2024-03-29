import { CreateUserRequestDto } from "../dto/create.user.request.dto";
import { LoginUserRequestDto } from "../dto/login.user.request.dto";
import { User } from "../entities/user.entity";

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
    createUser(createUserDto: CreateUserRequestDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    deleteUserById(id: string): Promise<User>;
}