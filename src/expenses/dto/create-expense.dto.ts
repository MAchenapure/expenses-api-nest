import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    readonly idUser: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    readonly description: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly value: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly date: Date;

    @IsOptional()
    @IsString()
    readonly category?: string;
}