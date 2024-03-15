import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserRequestDto } from './dto/create.auth.user.request.dto';
import { AuthUser } from './entities/auth.user';
import { CreateAuthUserResponseDto } from './dto/create.auth.user.response.dto';
import { ApiException } from 'src/errors/api.exception';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('/')
    async authenticate(@Body() authenticateDto: AuthenticateRequestDto) {
        try {
            const authentication = await this._authService.authenticate(authenticateDto);

            if (authentication) {
                return {
                    code: 0,
                    message: 'Auth OK.'
                }
            }
            else {
                return {
                    code: 1,
                    message: 'Auth NOK.'
                }
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }

    @Post('/user/create')
    async create(@Body() createAuthUserDto: CreateAuthUserRequestDto): Promise<CreateAuthUserResponseDto> {
        try {
            const authUser = await this._authService.createAuthUser(createAuthUserDto);

            if (authUser) {
                authUser.password = undefined;
                return {
                    code: 0,
                    message: 'User created successfully.',
                    authuser: authUser
                }
            } else {
                return {
                    code: 1,
                    message: 'User already exists.'
                }
            }
        }
        catch (err) {
            throw new ApiException(err.name, err.code, HttpStatus.INTERNAL_SERVER_ERROR, err);
        }
    }
}
