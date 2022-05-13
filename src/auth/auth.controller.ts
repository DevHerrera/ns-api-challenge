import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp() {
    return 'I am signing up...';
  }

  @Post('sign-in')
  signIn(@Res() response: Response): object {
    return response.status(HttpStatus.OK).json({
      msg: 'testing',
      hello: 'hi',
    });
  }
}
