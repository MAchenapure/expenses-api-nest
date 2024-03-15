import { CreateAuthUserRequestDto } from "../dto/create.auth.user.request.dto";
import { AuthUser } from "../entities/auth.user";

export const AUTH_USERS_REPOSITORY = "AuthUsersRepository";

export interface AuthUsersRepository {
    createAuthUser(createAuthUserDto: CreateAuthUserRequestDto): Promise<AuthUser>;
    findAuthUserByUsername(username: string): Promise<AuthUser>;
}