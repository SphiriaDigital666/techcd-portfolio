import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag-dto';
import { UpdateTagDto } from './dto/update-tag-dto';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) {}

    async createTag(createTagDto: CreateTagDto) {
        const existingTag = await this.prisma.tag.findFirst({
            where: { name: createTagDto.name },
        });

        if (existingTag) {
            throw new ConflictException('Tag with this name already exists');
        }

        return this.prisma.tag.create({
            data: createTagDto,
        });
    }

    async getAllTags() {
        const tags = await this.prisma.tag.findMany();
        const tagsWithCount = await Promise.all(
            tags.map(async (tag) => {
                const count = await this.prisma.gameTag.count({
                    where: { tagId: tag.id },
                });
                return { ...tag, count };
            })
        );
        return tagsWithCount;
    }

    async getTagById(id: string) {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tag) {
            throw new NotFoundException('Tag not found');
        }

        return tag;
    }

    async updateTag(id: string, updateTagDto: UpdateTagDto) {
        const existingTag = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!existingTag) {
            throw new NotFoundException('Tag not found');
        }

        return this.prisma.tag.update({
            where: { id },
            data: updateTagDto,
        });
    }

    async deleteTag(id: string) {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
        });

        if (!tag) {
            throw new NotFoundException('Tag not found');
        }

        const linkedGames = await this.prisma.gameTag.findMany({
            where: { tagId: id },
        });

        if (linkedGames.length > 0) {
            throw new BadRequestException('Tag is linked to one or more games. Cannot delete.');
        }

        return this.prisma.tag.delete({
            where: { id },
        });
    }
}
