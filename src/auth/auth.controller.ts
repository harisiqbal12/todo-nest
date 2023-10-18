import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }
}
