import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging-interceptor';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(LoggingInterceptor)
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
