import { BaseResponseDto } from "src/dtos/base.response.dto";
import { Category } from "../entities/category.entity";

export class CategoryResponseDto extends BaseResponseDto {
    category?: Category | Category[];
}