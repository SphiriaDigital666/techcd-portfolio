// game.controller.ts
import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game-dto';
import { GetGameDto } from './dto/get-game-dto';
import { UpdateGameDto } from './dto/update-game-dto';
import { SearchGameFilterParams } from './dto/search-game-filter-params-dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('top-rated')
  async getTopGamesByReviewRating() {
    return this.gameService.getTopGamesByReviewRating();
  }
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  // // Get all games with optional filters
  @Get()
  async getAllGames(@Query() query: SearchGameFilterParams) {
    return this.gameService.getAllGames(query);
  }
  @Get('admin')
  async getAllGames1(@Query() query: SearchGameFilterParams) {
    return this.gameService.getAllGames1(query);
  }

  @Post('bulk-games')
  async getBulkGames(@Body() games: { data: string[] }) {
    console.log(games.data);
    return this.gameService.getBulkGames(games.data);
  }

  //   @Get()
  // async getPartialGamesList(@Query() query: any) {
  //   return this.gameService.getPartialGamesList(query);

  @Get('max-price')
  async getMaxOverallGamePrice(): Promise<{ maxPrice: number }> {
    const maxPrice = await this.gameService.getMaxOverallGamePrice();
    return { maxPrice };
  }

  @Get('count-by-system')
  async getGameCountBySystem(): Promise<{ [key: string]: number }> {
    return await this.gameService.getGameCountBySystem();
  }
  // }

  @Get(':id')
  async getGameById(@Param('id') id: string) {
    return this.gameService.getGameById(id);
  }

  @Patch(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(id, updateGameDto);
  }

  // // Get a single game by ID
  // @Get(':id')
  // async getGameById(@Param('id') id: string) {
  //   return this.gameService.getGameById(id);
  // }
}
