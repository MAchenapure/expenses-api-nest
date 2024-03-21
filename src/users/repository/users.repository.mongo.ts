import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserRequestDto } from "../dto/create.user.request.dto";
import { UsersRepository } from "./users.repository.interface";
import { LoginUserRequestDto } from "../dto/login.user.request.dto";
import { User } from "../entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModel } from "../schemas/user.schema";
import mongoose from "mongoose";

@Injectable()
export class MongoUsersRepository implements UsersRepository {
    constructor(@InjectModel(User.name) private readonly _userModel: UserModel) { }

    async createUser(createUserDto: CreateUserRequestDto): Promise<User> {
        let user = await this._userModel.findOne({ email: createUserDto.email });

        // Returns null if an user with that email already exists in the database.
        if (user)
            return null;

        user = await new this._userModel(createUserDto).save();
        return this._mapRawUserToUser(user);
    }

    async deleteUserById(id: string): Promise<User> {
        if (!this._validateMongoId(id))
            return null;

        const user = await this._userModel.findOne({ _id: id });

        if (!user)
            return null;

        await this._userModel.deleteOne({ _id: user.id });
        return this._mapRawUserToUser(user);
    }

    async findAll(): Promise<User[]> {
        return await this._userModel.find();
    }

    async findById(id: string): Promise<User> {
        this._validateMongoId(id);

        const user = await this._userModel.findOne({ _id: id });
        if (!user)
            return null;

        return this._mapRawUserToUser(user);
    }

    async login(loginUserDto: LoginUserRequestDto): Promise<User> {
        const user = await this._userModel.findOne({ email: loginUserDto.email });

        if (user)
            return this._mapRawUserToUser(user);
        else
            return null;
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

    private _validateMongoId(id: string): boolean {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new BadRequestException("Invalid User ID.");

        return true;
    }
}