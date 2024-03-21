import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthUsersRepository } from "./auth.users.repository.interface";
import { AuthUser } from "../entities/auth.user";
import { InjectModel } from "@nestjs/mongoose";
import { AuthUserDocument, AuthUserModel } from "../schemas/auth.users.schema";
import { CreateAuthUserRequestDto } from "../dto/create.auth.user.request.dto";

@Injectable()
export class MongoAuthUsersRepository implements AuthUsersRepository {
    constructor(@InjectModel(AuthUser.name) private readonly _authUserModel: AuthUserModel) { }

    async createAuthUser(createAuthUserDto: CreateAuthUserRequestDto): Promise<AuthUser> {
        let authUser = await this.findAuthUserByUsername(createAuthUserDto.username);
        if (authUser)
            throw new BadRequestException("AuthUser already exists.");

        authUser = await new this._authUserModel(createAuthUserDto).save();
        if(!authUser)
            throw new InternalServerErrorException("An error ocurred while trying to create a new auth user.")
        
        return authUser;
    }

    async findAuthUserByUsername(username: string): Promise<AuthUser> {
        const authUser = await this._authUserModel.findOne({ username: username });
        if (!authUser)
            return null;

        return this._mapRawAuthUserToAuthUser(authUser);
    }

    private _mapRawAuthUserToAuthUser(rawAuthUser: AuthUserDocument) {
        return new AuthUser(
            rawAuthUser.username,
            rawAuthUser.password,
            rawAuthUser._id
        );
    }
}