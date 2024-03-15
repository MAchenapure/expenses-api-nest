import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateRequestDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}