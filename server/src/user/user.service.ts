/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { Role } from './dto/get-user-dto';
import { UserRolesService } from 'src/user-roles/user-roles.service';

interface UserWithRole extends User {
  role: {
    name: string;
  };
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userRolesService: UserRolesService,
  ) {}

  async updateRole(id: string, role: Role, adminUserId: any) {
    if (!this.isValidObjectId(id)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    if (!this.isValidObjectId(adminUserId)) {
      throw new HttpException('Invalid admin user ID', HttpStatus.BAD_REQUEST);
    }

    const admin = await this.prisma.user.findUnique({
      where: { id: adminUserId },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

    if (!admin) {
      throw new HttpException('Admin user not found', HttpStatus.NOT_FOUND);
    }
    if (
      admin.role.name !== Role.ADMIN &&
      admin.role.name !== Role.SUPER_ADMIN
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newRoleId = await this.userRolesService.getRoleId(role);

    return this.prisma.user.update({
      where: { id },
      data: { roleId: newRoleId },
      include: {
        role: {
          select: { name: true },
        },
      },
    });
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        role: {
          select: { name: true },
        },
      },
    });
  }
  async findAll(
    skip: number,
    take: number,
    roleName?: string,
    search?: string,
  ): Promise<[UserWithRole[], number]> {
    let whereCondition: any = {
      isDelete: false,
    };
  
    // If roleName is provided, filter by role name
    if (roleName) {
      whereCondition.role = {
        name: roleName, // Filter by the role name
      };
    }
  
    // If search query is provided, apply search on multiple fields
    if (search) {
      whereCondition.OR = [
        {
          username: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }
  
    // Fetch filtered users with pagination
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where: whereCondition,
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  
    // Count total items for pagination purposes
    const totalItems = await this.prisma.user.count({
      where: whereCondition,
    });
  
    return [users, totalItems];
  }
  

  /* async findAll(skip: number, take: number) :Promise<[UserWithRole[], number]> {
    const users = await this.prisma.user.findMany({
      skip,
      take,
      include: { role: {
        select: { name: true },
      } },
    });
    const totalItems = await this.prisma.user.count();
    return [users, totalItems];
  } */

  findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: { name: true },
        },
      },
    });
    return user;
  }

  async updateProfileImage(userId: string, profileImageUrl: string) {
    if (!this.isValidObjectId(userId)) {
      throw new HttpException('Invalid user ID', HttpStatus.BAD_REQUEST);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { profile_image: profileImageUrl },
      include: {
        role: {
          select: { name: true },
        },
      },
    });
  }

  async isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
