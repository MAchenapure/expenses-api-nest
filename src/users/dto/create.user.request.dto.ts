import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;
}
