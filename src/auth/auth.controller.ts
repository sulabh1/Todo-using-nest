import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dtos/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<Auth> {
    return this.authService.signUp(authCredentialDto);
  }
}
