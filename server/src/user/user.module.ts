import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Module({
  providers: [UserService, UserRolesService],
  controllers: [UserController],
  imports: [AuthModule],
})
export class UserModule {}
