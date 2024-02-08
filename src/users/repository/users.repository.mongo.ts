import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersRepository } from "./users.repository";
import { LoginUserDto } from "../dto/login-user-dto";
import { User } from "../entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModel } from "../schemas/user.schema";

@Injectable()
export class MongoUsersRepository implements UsersRepository {
    constructor(@InjectModel(User.name) private readonly _userModel: UserModel) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await new this._userModel(createUserDto).save();
        return this._mapRawUserToUser(user);

    }

    async deleteById(id: string): Promise<User> {
        const user = await this._userModel.findByIdAndDelete(id);
        return this._mapRawUserToUser(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this._userModel.findOne({ email: loginUserDto.email });
        return this._mapRawUserToUser(user);
    }

    private _mapRawUserToUser(rawUser: UserDocument): User {
        const user = new User();

        user.id = rawUser.id;
        user.email = rawUser.email;
        user.password = rawUser.password;
        user.name = rawUser.name;
        user.lastname = rawUser.lastname;
        user.createdAt = rawUser.createdAt;

        return user;
    }
}