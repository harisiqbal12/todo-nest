import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto';
import catchError from 'src/errors/catchError';
import { UserRes } from 'src/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  updateUser(id: string, dto: UserDTO): Promise<UserRes> {
    return catchError<UserRes>(async () => {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },

        select: {
          name: true,
          imageURI: true,
          createdAt: true,
          email: true,
          role: true,
        },
      });

      return user;
    });
  }
}
