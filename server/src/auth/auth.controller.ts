/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto, Role } from './dto/create-auth.dto';
import { JwtAuthGuard } from '../jwt/jwt.guard';
import { RefreshTokenGuard } from 'src/jwt/refresh.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthDTO } from './dto/google-auth-dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-otp')
  async verifyOtp(@Body() { email, pin }: { email: string; pin: string }) {
    return this.authService.verifyOtp(email, pin);
  }
  @Post('verify-otp-again')
  async sendVerifyEmail(@Body('email') email: string) {
    return this.authService.sendVerifyEmail(email);
  }
  @Get('verify-otp/:email')
  async verifyOtp1(@Param('email') email: string, @Res() res: Response) {
    try {
      const domain =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001/sign-in/'
          : 'https://thevingame.com/sign-in/';
      this.authService.verifyOtp1(email);
      return res.redirect(domain);
    } catch (error) {
      // Handle errors and redirect to an error page or send a different response
      return res.status(400).send({ message: 'Error verifying OTP' });
    }
  }
  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Patch('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    return this.authService.logout(req.user.sub);
  }

  @Patch('update-password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userId = req.user.sub; // Assuming 'sub' is the user ID in your JWT payload
    return this.authService.updatePassword(userId, updatePasswordDto);
  }

  @Get('verify-session')
  @UseGuards(JwtAuthGuard)
  async verifySession(@Request() req) {
    return this.authService.findOne(req.user.sub);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  /*   async findAll(@Query('role') roleName?: string) {
    // Pass the role name query parameter to the service's findAll method
    return this.authService.findAll(roleName);
  } */

  @Get()
  // @UseGuards(JwtAuthGuard) // apply auth guard
  async findAll(@Query('roleName') roleName: string) {
    return this.authService.findAll(roleName);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    console.log("here");
    const user = req.user;
    const googleAuthDto: GoogleAuthDTO = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: 'password',
      username: user.email.split('@')[0],
      role: Role.USER,
      pin: '123456',
      profile_image: user.profilePicture,
    };
    return this.authService.handleGoogleUser(googleAuthDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  refresh(
    @Body() { userId, refreshToken }: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body()
    { email, newPassword }: { email: string; pin: string; newPassword: string },
  ) {
    return this.authService.resetPassword(email, newPassword);
  }
}
