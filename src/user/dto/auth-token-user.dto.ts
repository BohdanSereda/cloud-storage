import {
  IsArray,
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  IsUUID,
} from "class-validator";
import {Role} from "src/roles/entities";
export class AuthTokenUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsJWT()
  refreshToken?: string;

  @IsArray()
  @IsNotEmptyObject()
  readonly roles: Role[];
}
