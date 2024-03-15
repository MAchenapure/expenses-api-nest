import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthUser } from './entities/auth.user';
import { AuthUsersSchema } from './schemas/auth.users.schema';
import { AUTH_USERS_REPOSITORY } from './repository/auth.users.repository.interface';
import { MongoAuthUsersRepository } from './repository/auth.users.repository.mongo';

@Module({
  imports: [MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthUsersSchema }])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_USERS_REPOSITORY,
      useClass: MongoAuthUsersRepository
    }
  ]
})
export class AuthModule { }
