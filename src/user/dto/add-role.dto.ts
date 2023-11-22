import {IsNotEmpty, IsString} from "class-validator";
export class AddRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
