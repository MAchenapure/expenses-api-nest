import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserRequestDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}