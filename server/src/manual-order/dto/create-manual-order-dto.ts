import { 
  IsString, 
  IsEmail, 
  IsPhoneNumber, 
  IsNumber, 
  ValidateNested, 
  IsArray, 
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManualOrderDto {
  @IsString()
  systemuserId: string;
  
  @IsOptional()
  userId: string;

  @IsOptional()
  appliedCoupons: string;

  @IsOptional()
  message: string;

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

  @IsNumber()
  totalAmount: number;

  @ValidateNested({ each: true })
  @Type(() => Product)
  @IsArray()
  products: Product[];
}

export class Product {
  @IsString()
  sku: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
