import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand-dto';
import { UpdateBrandDto } from './dto/update-brand-dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    return await this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async findAll() {
    const brands = await this.prisma.brand.findMany();
    const brandsWithGameCount = await Promise.all(
      brands.map(async (brand) => {
        const gameCount = await this.prisma.game.count({
          where: { brandId: brand.id },
        });
        return { ...brand, gameCount };
      })
    );
    return brandsWithGameCount;
  }

  async findOne(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');
    
    return await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async remove(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) throw new NotFoundException('Brand not found');

    const count = await this.prisma.game.count({
      where: { brandId: brand.id },
    });

    if (count > 0) {
      throw new BadRequestException(
        'Cannot delete brand with associated games'
      );
    }
    
    return await this.prisma.brand.delete({ where: { id } });
  }
}
