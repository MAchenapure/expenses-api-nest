import { BaseResponseDto } from "../../dtos/base.response.dto";
import { User } from "../entities/user.entity";

export class UserResponseDto extends BaseResponseDto {
    user?: User;
}