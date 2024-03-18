import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthUser } from './entities/auth.user';
import { AuthUsersSchema } from './schemas/auth.users.schema';
import { AUTH_USERS_REPOSITORY } from './repository/auth.users.repository.interface';
import { MongoAuthUsersRepository } from './repository/auth.users.repository.mongo';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './decorators/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthUsersSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_USERS_REPOSITORY,
      useClass: MongoAuthUsersRepository
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ]
})
export class AuthModule { }
