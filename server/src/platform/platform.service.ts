import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlatformDto } from './dto/create-platform-dto';
import { UpdatePlatformDto } from './dto/update-platform-dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async create(createPlatformDto: CreatePlatformDto) {
    return await this.prisma.platform.create({
      data: createPlatformDto,
    });
  }

  async findAll() {
    const platforms = await this.prisma.platform.findMany();
    const platformsWithGameCount = await Promise.all(
      platforms.map(async (platform) => {
        const gameCount = await this.prisma.game.count({
          where: { platformId: platform.id },
        });
        return { ...platform, gameCount };
      })
    );
    return platformsWithGameCount;
  }

  async findOne(id: string) {
    const platform = await this.prisma.platform.findUnique({ where: { id } });
    if (!platform) throw new NotFoundException('Platform not found');
    return platform;
  }

  async update(id: string, updatePlatformDto: UpdatePlatformDto) {
    const platform = await this.prisma.platform.findUnique({ where: { id } });
    if (!platform) throw new NotFoundException('Platform not found');
    
    return await this.prisma.platform.update({
      where: { id },
      data: updatePlatformDto,
    });
  }

  async remove(id: string) {
    const platform = await this.prisma.platform.findUnique({ where: { id } });
    if (!platform) throw new NotFoundException('Platform not found');
    
    // Check if any games are associated with this platform
    const gameCount = await this.prisma.game.count({
      where: { platformId: platform.id },
    });

    console.log(`gamecount for id: ${id}`, gameCount)

    // return gameCount;

    if (gameCount > 0) {
      throw new BadRequestException(
        'Platform cannot be deleted because it has associated games.'
      );
    }

    return await this.prisma.platform.delete({ where: { id } });
  }
}
