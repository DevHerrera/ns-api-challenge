import { Controller, Post, Get, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { SignInUserDto } from './dto/signInUser.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created succesfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'email', type: 'string', required: true, format: 'email' })
  @ApiParam({ name: 'password', type: 'string', required: true })
  @ApiParam({ name: 'roleId', type: 'number', required: true })
  @ApiParam({ name: 'photoUrl', type: 'string', required: false })
  @ApiParam({ name: 'name', type: 'string', required: true })
  signUp(@Body() userData: SignUpUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 200, description: 'User authenticated succesfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Invalid credentials' })
  @ApiParam({ name: 'email', type: 'string', required: true, format: 'email' })
  @ApiParam({ name: 'password', type: 'string', required: true })
  signIn(@Body() userData: SignInUserDto): object {
    return this.authService.signIn(userData);
  }
}
