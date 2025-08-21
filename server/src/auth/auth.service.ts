/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { sendEmail } from '../utils/email.utils';
import { GoogleAuthDTO } from './dto/google-auth-dto';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userRolesService: UserRolesService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    // Check if the username or email already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: createAuthDto.username },
          { email: createAuthDto.email },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === createAuthDto.username) {
        throw new HttpException(
          'Username already taken. Please choose another username.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (existingUser.email === createAuthDto.email) {
        throw new HttpException(
          'Email already in use. Please use a different email address.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    // Fetch role by name, throw error if not found
    const role = await this.prisma.user_Roles.findUnique({
      where: { name: createAuthDto.role },
    });

    if (!role) {
      throw new HttpException(
        `Role "${createAuthDto.role}" not found.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Generate a unique user ID
    const userId = await this.generateUniqueUserId();

    // Send verification email
    try {
      await this.sendVerifyEmail(createAuthDto.email);
    } catch (error) {
      throw new HttpException(
        `Failed to send verification email: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Create user in the database
    const user = await this.prisma.user.create({
      data: {
        userId, // Assign generated userId
        username: createAuthDto.username,
        firstName: createAuthDto.firstName,
        lastName: createAuthDto.lastName,
        email: createAuthDto.email,
        password: hashedPassword,
        role: {
          connect: { id: role.id },
        },
        profile_image:
          createAuthDto.profile_image ??
          'http://store.thevingame.com/uploads/1729749708879.jpeg',
        isVerify: false, // Default to not verified
      },
      select: {
        id: true,
        userId: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        profile_image: true,
        isVerify: true,
      },
    });

    // Generate tokens for the user
    const tokens = await this.generateTokens(user.id, user.username);

    // Save refresh token in the database
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // Return response
    return {
      message:
        'User registered successfully. Please verify your email to activate your account.',
      user,
      ...tokens,
    };
  }

  private async generateUniqueUserId(): Promise<string> {
    let isUnique = false;
    let userId: string;

    while (!isUnique) {
      // Generate a random userId with the format SUxxxxxx
      userId = `SU${Math.floor(100000 + Math.random() * 900000)}`; // e.g., SU123456

      console.log('userId,.....', userId);

      // Check if this userId already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { userId },
      });

      if (!existingUser) {
        isUnique = true; // userId is unique
      }
    }

    console.log('here....', userId);

    return userId;
  }

  async login(createAuthDto: LoginDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: createAuthDto.email },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
        profile_image: true,
        isVerify: true,

        address: true,
        city: true,
        country: true,
        phone: true,
        postalCode: true,
        state: true,
      },
    });

    // user exists and the password matches
    if (user && (await bcrypt.compare(createAuthDto.password, user.password))) {
      const tokens = await this.generateTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, ...tokens, message: 'Login Success' };
    }

    // If authentication fails
    throw new UnauthorizedException('Invalid credentials');
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    // Find the user
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Handle role update
    let roleId = user.roleId; // Default to the current roleId
    if (updateUserDto.role) {
      const role = await this.prisma.user_Roles.findUnique({
        where: { name: updateUserDto.role },
      });
      if (!role) {
        throw new NotFoundException(`Role ${updateUserDto.role} not found`);
      }
      roleId = role.id; // Update roleId if a valid role is provided
    }

    // Hash password if provided
    const hashedPassword = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : user.password;

    // Update the user
    const updatedUserData = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: updateUserDto.firstName ?? user.firstName,
        lastName: updateUserDto.lastName ?? user.lastName,
        email: updateUserDto.email ?? user.email,
        password: hashedPassword,
        profile_image: updateUserDto.profile_image ?? user.profile_image,
        username: updateUserDto.username ?? user.username,
        roleId,
        address: updateUserDto.address ?? user.address,
        state: updateUserDto.state ?? user.state,
        city: updateUserDto.city ?? user.city,
        postalCode: updateUserDto.postalCode ?? user.postalCode,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        profile_image: true,
      },
    });

    // Return success response
    return {
      user: updatedUserData,
      message: `${updatedUserData.username} updated successfully`,
    };
  }

  /*  async findAll(roleName?: string) {
    const users = await this.prisma.user.findMany({
      include: {
        role: {
          select: {
            name: true, // Fetch the role name
          },
        },
      },
    });

    return users;
  } */

  async findAll(roleName?: string) {
    let whereCondition = {};
    if (roleName) {
      whereCondition = {
        role: {
          name: roleName,
        },
      };
    }

    // Fetch users and include their roles
    const users = await this.prisma.user.findMany({
      where: whereCondition,
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return users;
  }

  async findOne(id: string) {
    if (!this.isValidObjectId(id)) {
      throw new Error('Invalid user ID');
    }
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async isValidObjectId(id: string) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  async remove(id: string) {
    let deletedUser = await this.prisma.user.update({
      where: { id },
      data: {
        isDelete: true,
      },
    });

    return {
      user: deletedUser,
      message: `${deletedUser.username} delete successfully`,
    };
  }

  private async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async generateTokens(userId: string, username: string) {
    const payload = { sub: userId, username };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2000m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '11440m', // Longer-lived refresh token
    });

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    // Check if user exists and refresh token matches
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate a new access token
    const newAccessToken = this.jwtService.sign(
      { sub: user.id, username: user.username },
      {
        expiresIn: '120s',
      },
    );

    return { accessToken: newAccessToken };
  }

  async verifyOtp(email: string, pin: string) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Check if user exists and the pin matches
    if (user && user.pin === pin) {
      await this.prisma.user.update({
        where: { email },
        data: {
          isVerify: true,
          pin: null,
          pinExpiry: null,
        },
      });

      return { message: 'OTP verified successfully' };
    }

    // Throw an error if the OTP is invalid
    throw new UnauthorizedException('Invalid OTP');
  }

  encodeEmailForUrl = (email) => {
    return encodeURIComponent(email);
  };

  async verifyOtp1(email: string) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });

    await this.prisma.user.update({
      where: { email },
      data: {
        isVerify: true,
        pin: null,
        pinExpiry: null,
      },
    });

    /* return { 
      statusCode: HttpStatus.FOUND,
      headers: { 'Location': 'http://your-frontend-url.com/home' }
    }; */
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const pinExpiry = new Date();
    pinExpiry.setMinutes(pinExpiry.getMinutes() + 10); // Set expiration time (e.g., 10 minutes)

    const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <div style="padding: 20px; text-align: center;">
        <!-- Reference the image using its URL -->
        <img src="http://localhost:3000/public/images/logo.png" alt="Company Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear <strong>${email}</strong>,</p>
        
        <h3 style="color: #4caf50;">Your OTP is:</h3>
        <p style="font-size: 24px; font-weight: bold; color: #333;">${pin}</p>

        <p style="font-size: 16px; color: #555;">This OTP is valid for 10 minutes. Please use it to reset your password. If you did not request this, please ignore this email.</p>
        
        <div style="background-color: #f4f4f4; padding: 10px; margin-top: 20px; text-align: center;">
          <p style="font-size: 14px; color: #555; margin: 0;">Thank you for choosing our service.</p>
        </div>
      </div>
    </div>
  `;

    await sendEmail(email, 'Your OTP', emailContent);

    await this.prisma.user.update({
      where: { email },
      data: {
        pin,
        pinExpiry,
      },
    });

    return { message: 'PIN sent to email' };
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('Email not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log(`Password hashed successfully: ${hashedPassword}`);

      await this.prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          pin: null,
          pinExpiry: null,
        },
      });

      console.log('Password reset completed successfully');
      return { message: 'Password reset successfully' };
    } catch (error) {
      console.error('Error resetting password:', error.message);
      throw new Error('Password reset failed');
    }
  }

  async handleGoogleUser(googleAuthDto: GoogleAuthDTO) {
    console.log('googleAuthDto', googleAuthDto);
    const existingUser = await this.prisma.user.findUnique({
      where: { email: googleAuthDto.email },
      include: {
        role: {
          select: { name: true },
        },
      },
    });

    let authUser = null;

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(googleAuthDto.password, 10);
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      const role = await this.prisma.user_Roles.findUnique({
        where: { name: googleAuthDto.role },
      });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
      }

      const userId = await this.generateUniqueUserId();

      console.log('userId', userId);

      const user = await this.prisma.user.create({
        data: {
          userId,
          username: googleAuthDto.username,
          firstName: googleAuthDto.firstName,
          lastName: googleAuthDto.lastName,
          email: googleAuthDto.email,
          password: hashedPassword,
          roleId: role.id,
          isVerify: true,
          profile_image: googleAuthDto.profile_image,
          pin,
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });
      authUser = user;
    } else {
      authUser = existingUser;
    }

    const tokens = await this.generateTokens(authUser.id, authUser.username);
    await this.updateRefreshToken(authUser.id, tokens.refreshToken);
    const userToSend = {
      id: authUser.id,
      username: authUser.username,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      role: authUser.role,
      profile_image: authUser.profile_image,
      isVerify: authUser.isVerify,
    };

    return `<html>
    <body>
      <script>
        window.opener.postMessage({
          user: ${JSON.stringify(userToSend)},
          accessToken: '${tokens.accessToken}',
          refreshToken: '${tokens.refreshToken}'
        }, '*');
        window.close();
      </script>
    </body>
  </html>`;
  }

  async userExists(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async logout(sub: any) {
    await this.prisma.user.update({
      where: { id: sub },
      data: { refreshToken: null },
    });
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      message: 'Logout successful',
    };
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify old password
    const isOldPasswordCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      10,
    );

    // Update the user's password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async sendVerifyEmail(email: string) {
    const domain =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.BE_URL;
    const encodedEmail = this.encodeEmailForUrl(email);
    const url = `${domain}/auth/verify-otp/${encodedEmail}`;

    const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <div style="padding: 20px; text-align: center;">
        <!-- Reference the image using its URL -->
        <img src="http://localhost:3000/public/images/logo.png" alt="Company Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear <strong>${email}</strong>,</p>
        
        <h3 style="color: #4caf50;">Please verify your email address:</h3>
        <p style="font-size: 16px;">To complete your registration, please click the link below to verify your email address.</p>
        
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin-top: 20px;">
          <a href="${url}" style="font-size: 18px; color: #fff; background-color: #4caf50; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
        
        <p style="font-size: 16px; color: #555; margin-top: 20px;">If you did not request this verification, please ignore this email.</p>
        
        <div style="background-color: #f4f4f4; padding: 10px; margin-top: 20px; text-align: center;">
          <p style="font-size: 14px; color: #555; margin: 0;">Thank you for choosing our service.</p>
        </div>
      </div>
    </div>
  `;

    await sendEmail(
      email,
      'Verify Email',
      emailContent,
    );
  }
}
