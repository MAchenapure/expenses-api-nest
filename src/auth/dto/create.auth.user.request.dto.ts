import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthUserRequestDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}