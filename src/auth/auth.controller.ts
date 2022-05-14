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
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @HttpCode(200)
  test() {
    return this.authService.test();
  }
  @Post('sign-up')
  @HttpCode(201)
  signUp(@Body() userData: SignUpUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('sign-in')
  signIn(@Res() response: Response): object {
    return response.status(HttpStatus.OK).json({
      msg: 'testing',
      hello: 'hi',
    });
  }
}
