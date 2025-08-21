// export class SearchGameFilterParams {
//     id?: string;
//     productName?: string;
//     rating?: number;
//     price?: number;
//     tags?: string | string[];        // Explicitly set type to string | string[]
//     platforms?: string | string[];   // Explicitly set type to string | string[]
//     brands?: string | string[];      // Explicitly set type to string | string[]
//     systems?: string | string[];     // Explicitly set type to string | string[]
//     page?: number;
//     limit?: number;
//     sort?: string;
//   }

import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsArray, IsIn, isBoolean, IsBoolean } from 'class-validator';

export class SearchGameFilterParams {
    @IsOptional()
    @IsString()
    id?: string;

    @IsOptional()
    @IsString()
    productName?: string;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsNumber()
    maxPrice?: number;

    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @IsString({ each: true })
    tags?: string | string[];

    @IsOptional()
    @IsString({ each: true })
    platforms?: string | string[];

    @IsOptional()
    @IsString({ each: true })
    brands?: string | string[];

    @IsOptional()
    @IsString({ each: true })
    systems?: string | string[];

    @IsOptional()
    @IsBoolean()
    // @Transform(({ value }) => value === 'true')
    addToCarousel?: boolean;

    @IsOptional()
    @IsBoolean()
    displayInLatesGames?: boolean;

    @IsOptional()
    @IsBoolean()
    addToLatestGames?: boolean;

    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    @IsString()
    stockStatus?: string;
}

  