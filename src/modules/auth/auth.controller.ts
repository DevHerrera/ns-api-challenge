import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  HttpCode,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @HttpCode(200)
  test() {}

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
