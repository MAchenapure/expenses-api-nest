import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequestDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly lastname: string;
}
