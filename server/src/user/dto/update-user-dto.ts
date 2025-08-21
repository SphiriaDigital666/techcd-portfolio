import { IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNonNullString } from 'src/utils/is-non-null-string';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  username?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  firstName?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  lastName?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  phone?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  address?: string;

  @IsOptional()
  // @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  city?: string;

  @IsOptional()
  // @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  state?: string;

  @IsOptional()
  // @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  country?: string;

  @IsOptional()
  // @IsString()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsNonNullString({ message: 'value must be a non-empty string' })
  postalCode?: string;
}
