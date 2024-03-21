import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthUserRequestDto } from './dto/create.auth.user.request.dto';
import { CreateAuthUserResponseDto } from './dto/create.auth.user.response.dto';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { PublicRoute } from './decorators/auth.public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @PublicRoute()
    @Post('/')
    async authenticate(@Body() authenticateDto: AuthenticateRequestDto) {
        try {
            const authentication = await this._authService.authenticate(authenticateDto);
            return {
                message: 'Authetication done successfully.',
                auth: authentication
            }
        }
        catch (err) {
            throw err;
        }
    }

    @Post('/create')
    async create(@Body() createAuthUserDto: CreateAuthUserRequestDto): Promise<CreateAuthUserResponseDto> {
        try {
            const authUser = await this._authService.createAuthUser(createAuthUserDto);
            authUser.password = undefined;
            return {
                code: 0,
                message: 'User created successfully.',
                authuser: authUser
            }
        }
        catch (err) {
            throw err;
        }
    }
}
