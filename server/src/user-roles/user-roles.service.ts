/* eslint-disable prettier/prettier */
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from './dto/create-user-role.dto';

import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserRolesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const newRole = await this.prisma.user_Roles.create({
      data: {
        name: createUserRoleDto.name,
      },
    });
    return { newRole, message: `${createUserRoleDto.name} added` };
  }

  async findAll() {
    return this.prisma.user_Roles.findMany();
  }

  async findOne(id: string) {
    const cachedRole = await this.cacheManager.get<string>(`user_role_${id}`);
    if (cachedRole) {
      return JSON.parse(cachedRole);
    }
    const role = await this.prisma.user_Roles.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    await this.cacheManager.set(`user_role_${id}`, JSON.stringify(role), 3600);
    return role;
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    // Check if the role exists
    const roleExists = await this.prisma.user_Roles.findUnique({
      where: { id },
    });
  
    // If the role doesn't exist, throw a 404 Not Found exception
    if (!roleExists) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  
    // Await the update operation
    const updateRole = await this.prisma.user_Roles.update({
      where: { id },
      data: {
        name: updateUserRoleDto.name,
      },
    });
  
    // Invalidate the cache for this role, if caching is used
    await this.cacheManager.del(`user_role_${id}`);
  
    // Return the updated role and a success message
    return { updateRole, message: `Role with id ${id} updated successfully` };
  }
  

  
async remove(id: string) {
  // First, check if the role exists
  const roleExists = await this.prisma.user_Roles.findUnique({
    where: { id },
  });

  // If the role doesn't exist, throw a 404 Not Found exception
  if (!roleExists) {
    throw new NotFoundException(`Role with id ${id} not found`);
  }

  // Check if any users are assigned to this role
  const usersWithRole = await this.prisma.user.findMany({
    where: { roleId: id },
  });

  // If there are users assigned to the role, throw a custom error message
  if (usersWithRole.length > 0) {
    throw new BadRequestException(
      `Cannot delete role with id ${roleExists.name} because it is assigned to ${usersWithRole.length} users.`,
    );
  }

  // Proceed with deleting the role if no users are assigned
  const deleteRole = await this.prisma.user_Roles.delete({
    where: { id },
  });

  // Return the deleted role and a success message
  return { deleteRole, message: `Role with id ${id} deleted successfully` };
}

  async getRoleId(role: string) {
    const roleId = await this.prisma.user_Roles.findFirst({
      where: { name: role },
      select: { id: true },
    });
    if (!roleId) {
      throw new NotFoundException(`Role with name ${role} not found`);
    }
    return roleId.id;
  }
}
