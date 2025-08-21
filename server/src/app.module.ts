/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PresignedUrlModule } from './presigned-url/presigned-url.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CategoryModule } from './category/category.module';
import { GameModule } from './game/game.module';
import { ReviewModule } from './review/review.module';
import { TagModule } from './tag/tag.module';
import { BrandModule } from './brand/brand.module';
import { PlatformModule } from './platform/platform.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ManualOrderModule } from './manual-order/manual-order.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
      serveRoot: '/public/',
    }),
    CacheModule.register({
      ttl: 600,
      max: 100,
    }),
    AuthModule,
    PresignedUrlModule,
    PrismaModule,
    UserModule,
    UserRolesModule,
    CategoryModule,
    GameModule,
    ReviewModule,
    TagModule,
    BrandModule,
    PlatformModule,
    CouponModule,
    OrderModule,
    WishlistModule,
    ManualOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [CacheModule],
})
export class AppModule {}
