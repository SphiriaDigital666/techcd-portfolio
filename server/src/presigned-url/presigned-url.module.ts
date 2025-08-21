import { Module } from '@nestjs/common';
import { PresignedUrlController } from './presigned-url.controller';
import { PresignedUrlService } from './presigned-url.service';

@Module({
  controllers: [PresignedUrlController],
  providers: [PresignedUrlService],
})
export class PresignedUrlModule {}
