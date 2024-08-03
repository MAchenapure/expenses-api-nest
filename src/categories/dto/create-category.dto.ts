import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    readonly description: string;

    @IsString()
    readonly idUser: string;
}