import { BaseResponseDto } from "../../dto/base.response.dto";
import { AuthUser } from "../entities/auth.user";

export class CreateAuthUserResponseDto extends BaseResponseDto {
    authuser?: AuthUser
}