// src/games/dto/partial-get-game-dto.ts

import { System, StockStatus } from '@prisma/client';

export class GetPartialGameDto {
  id: string;
  productName: string;
  displayName: string;
  system: System;
  SKU:string;
  sellingPrice: number;
  regularPrice:number;
  stock: number;
  stockStatus: StockStatus;
  coverImage: string;
  cardimage:string;
  published: boolean;
}
