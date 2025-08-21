import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export class CreateAuthDto {
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username is required.' })
  username: string;

  @IsString({ message: 'First Name must be a string.' })
  @IsNotEmpty({ message: 'First Name is required.' })
  firstName: string;

  @IsString({ message: 'Last Name must be a string.' })
  @IsNotEmpty({ message: 'Last Name is required.' })
  lastName: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsEmail({}, { message: 'A valid email address is required.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string.' })
  role: string;

  @IsOptional()
  @IsString({ message: 'Role ID must be a string.' })
  roleId: string;

  @IsOptional()
  @IsString({ message: 'Profile Image must be a string.' })
  profile_image: string;

  @IsOptional()
  @IsString({ message: 'Pin must be a string.' })
  pin: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  address: string;

  @IsOptional()
  @IsString({ message: 'State must be a string.' })
  state: string;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  city: string;

  @IsOptional()
  @IsString({ message: 'Postal Code must be a string.' })
  postalCode: string;
}
