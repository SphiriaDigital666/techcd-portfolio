import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PresignedUrlService {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async generatePresignedUrl(fileType: string): Promise<{
    uploadUrl: string;
    downloadUrl: string;
  }> {
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!allowedFileTypes.includes(fileType)) {
      throw new BadRequestException('File type not allowed.');
    }

    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const fileName = `${uuidv4()}.${fileType.split('/')[1]}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    const downloadUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    return { uploadUrl: url, downloadUrl };
  }

  async generatePresignedUrls(
    fileTypes: string[],
  ): Promise<{ uploadUrl: string; downloadUrl: string }[]> {
    if (fileTypes.length > 5) {
      throw new BadRequestException('You can only upload 5 files at a time.');
    }
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const invalidFileTypes = fileTypes.filter(
      (fileType) => !allowedFileTypes.includes(fileType),
    );

    if (invalidFileTypes.length) {
      throw new BadRequestException('File types not allowed.');
    }

    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const presignedUrls = await Promise.all(
      fileTypes.map(async (fileType) => {
        const fileExtension = fileType.split('/')[1];
        const fileName = `${uuidv4()}.${fileExtension}`;

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          ContentType: fileType,
        });

        const url = await getSignedUrl(this.s3Client, command, {
          expiresIn: 3600,
        });
        const downloadUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
        return { uploadUrl: url, downloadUrl };
      }),
    );

    return presignedUrls;
  }
}
