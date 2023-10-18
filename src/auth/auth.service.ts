import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/errors/AppErrors';
import catchError from 'src/errors/catchError';
import { LoginDTO, RegisterDTO } from './dto';
import { UserRes } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  login(dto: LoginDTO): Promise<UserRes> {
    return catchError<UserRes>(async () => {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },

        select: {
          password: true,
          email: true,
          name: true,
          imageURI: true,
          role: true,
          createdAt: true,
          id: true,
        },
      });

      const isValidPassword = await argon.verify(user.password, dto.password);

      if (!isValidPassword)
        throw new AppError('Invalid email or password', 401);

      delete user.password;
      delete user.id;

      return {
        ...user,
        access_token: await this.signToken(user.id, user.email, user.name),
      };
    });
  }

  register(dto: RegisterDTO): Promise<UserRes> {
    return catchError<UserRes>(async () => {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
        },

        select: {
          name: true,
          email: true,
          imageURI: true,
          role: true,
          createdAt: true,
          id: true,
        },
      });

      return {
        ...user,
        access_token: await this.signToken(user.id, user.email, user.name),
      };
    });
  }

  private signToken(id: string, email: string, name: string) {
    const payload = {
      sub: id,
      email,
      name,
    };

    return this.jwt.signAsync(payload);
  }
}
