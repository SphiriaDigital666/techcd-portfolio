import { IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateOrderDto {
  // Product Information
  @IsString()
  orderId: string;

  @IsString()
  gameId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  // Customer Information
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  message?: string;
}
