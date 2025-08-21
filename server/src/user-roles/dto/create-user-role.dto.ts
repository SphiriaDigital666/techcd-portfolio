// user-roles.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  name: string;
}
