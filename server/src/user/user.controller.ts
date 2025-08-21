/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
  Request,
  UnauthorizedException,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from './../jwt/jwt.guard';
import { UserService } from './user.service';
import { UpdateProfileImageDto } from './dto/update-profile-image-dto';
import { GetUserDto, Role } from './dto/get-user-dto';
import { paginate, PaginationResult } from 'src/utils/pagination.utils';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('roleName') roleName: string,
    @Query('search') search: string,
  ): Promise<PaginationResult<GetUserDto>> {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [users, totalItems] = await this.userService.findAll(
      skip,
      limitNum,
      roleName,
      search,
    );

    const userDtos = users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      firstName: user.firstName,
      lastName: user.lastName,
      role: Role[user.role.name as keyof typeof Role],
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
    }));

    return paginate(userDtos, totalItems, pageNum, limitNum);
  }

  @Get('profile')
  async findOne(@Request() req): Promise<GetUserDto> {
    const id = req.user.sub;
    const user = await this.userService.findOne(id);
    const GetUserDto: GetUserDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      firstName: user.firstName,
      lastName: user.lastName,
      role: Role[user.role.name],
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      state: user.state || '',
    };
    return GetUserDto;
  }

  @Patch(':id/profile-image')
  async updateProfileImage(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProfileImageDto: UpdateProfileImageDto,
  ): Promise<GetUserDto> {
    if (req.user.sub !== id) {
      throw new UnauthorizedException('Unauthorizeddsds');
    }
    const user = await this.userService.updateProfileImage(
      id,
      updateProfileImageDto.profile_image,
    );

    const GetUserDto: GetUserDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      firstName: user.firstName,
      lastName: user.lastName,
      role: Role[user.role.name],
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      state: user.state || '',
    };
    return GetUserDto;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const user = await this.userService.update(id, updateUserDto);
    const GetUserDto: GetUserDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      firstName: user.firstName,
      lastName: user.lastName,
      role: Role[user.role.name],
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      state: user.state || '',
    };
    return GetUserDto;
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: Role,
    @Request() req,
  ): Promise<GetUserDto> {
    const adminUserId = req.user.sub;
    const user = await this.userService.updateRole(id, role, adminUserId);
    const GetUserDto: GetUserDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image,
      firstName: user.firstName,
      lastName: user.lastName,
      role: Role[user.role.name],
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      state: user.state || '',
    };
    return GetUserDto;
  }
}
