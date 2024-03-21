import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthUserRequestDto } from '../auth/dto/create.auth.user.request.dto';
import { AuthUser } from '../auth/entities/auth.user';
import { AUTH_USERS_REPOSITORY, AuthUsersRepository } from './repository/auth.users.repository.interface';
import { compare, hash } from '../services/hash.service';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_USERS_REPOSITORY) private readonly _authUserRepository: AuthUsersRepository,
        private _jwtService: JwtService
    ) { }

    async authenticate(authenticateDto: AuthenticateRequestDto): Promise<{ access_token: string }> {
        const dbAuthUser = await this._findAuthUserByUsername(authenticateDto.username);

        if (!dbAuthUser)
            return null;

        const passValidation = await compare(authenticateDto.password, dbAuthUser.password);

        if(!passValidation)
            return null;

        const payload = { sub: dbAuthUser.id, username: dbAuthUser.username };
        return {
            access_token: await this._jwtService.signAsync(payload),
        };
    }

    async createAuthUser(createAuthUserDto: CreateAuthUserRequestDto): Promise<AuthUser> {
        const password = await hash(createAuthUserDto.password);
        createAuthUserDto.password = password;
        return await this._authUserRepository.createAuthUser(createAuthUserDto);
    }

    private async _findAuthUserByUsername(username: string): Promise<AuthUser> {
        return await this._authUserRepository.findAuthUserByUsername(username);
    }
}
