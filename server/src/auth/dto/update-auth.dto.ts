// src/auth/dto/update-user.dto.ts
import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  username?: string;

  @IsOptional()
  @IsString({ message: 'First Name must be a string.' })
  @IsNotEmpty({ message: 'First Name is required.' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last Name must be a string.' })
  @IsNotEmpty({ message: 'Last Name is required.' })
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: 'A valid email address is required.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string.' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Role ID must be a string.' })
  roleId?: string;

  @IsOptional()
  @IsString({ message: 'Profile Image must be a string.' })
  profile_image?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'State must be a string.' })
  state?: string;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  city?: string;

  @IsOptional()
  @IsString({ message: 'Postal Code must be a string.' })
  postalCode?: string;
}
