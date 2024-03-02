import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { USER_ALREADY_REGISTERED } from './auth.constants';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  //инжектим
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(201) // 201 - created
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_REGISTERED);
    }

    return this.authService.createUser(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200) // 200 потому что просто входим
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const user = await this.authService.validateUser(dto.login, dto.password);

    return this.authService.login(user.email);
  }
}
