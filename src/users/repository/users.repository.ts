import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user-dto";
import { User } from "../entities/user.entity";

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
    createUser(createUserDto: CreateUserDto): Promise <User>;
    login(loginUserDto: LoginUserDto): Promise<User>;
    deleteById(id: string): Promise<User>;
}