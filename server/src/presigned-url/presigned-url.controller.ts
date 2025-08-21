import { Body, Controller, Post, Get, Put } from '@nestjs/common';
import { PresignedUrlService } from './presigned-url.service';
import { NotImplementedException } from '@nestjs/common';

@Controller('presigned-url')
export class PresignedUrlController {
  constructor(private readonly presignedUrl: PresignedUrlService) {}

  @Post('generate')
  async getPresignedUrl(@Body('fileType') fileType: string) {
    return this.presignedUrl.generatePresignedUrl(fileType);
  }

  @Post('generate-bulk')
  async getPresignedUrls(@Body('fileTypes') fileTypes: string[]) {
    return this.presignedUrl.generatePresignedUrls(fileTypes);
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Put()
  update() {
    throw new NotImplementedException();
  }
}
