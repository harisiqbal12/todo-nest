import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { JwtUser } from 'src/common';
import { UserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: JwtUser) {
    delete user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Patch('me')
  update(@GetUser() user: JwtUser, @Body() dto: UserDTO) {
    return this.userService.updateUser(user.id, dto);
  }
}
