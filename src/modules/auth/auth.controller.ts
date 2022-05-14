import { Controller, Post, Get, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() userData: SignUpUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('sign-in')
  signIn(@Body() userData: SignInUserDto): object {
    return this.authService.signIn(userData);
  }
}
