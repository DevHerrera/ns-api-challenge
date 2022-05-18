import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

import { SignUpUserDto } from '../dto/signUpUser.dto';
import { SignInUserDto } from '../dto/signInUser.dto';

import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  public async test(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Signs up the user using their information
   * @param userData - User's fields
   * @return {[json]} [Response with user data and token]
   */

  public async signUp(userData: SignUpUserDto): Promise<{
    user: User;
    auth: { access_token: string };
  }> {
    let user = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (user) {
      throw new ConflictException('Email already in use');
    }
    // Let's encrypt the password
    const hash = await argon.hash(userData.password);
    userData.password = hash;
    user = await this.userRepository.save(userData);
    delete user.password;
    return {
      user,
      auth: await this.signToken(user.id, user.email),
    };
  }

  /**
   * Signs in the user through their password and email
   * @param userData - User's email and password
   * @return {[json]} [Response with user data and token]
   */

  public async signIn(userData: SignInUserDto): Promise<Object> {
    let user = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    // Let's compare passwords
    const passwordMatches = await argon.verify(
      user.password,
      userData.password,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }
    delete user.password;
    return {
      auth: await this.signToken(user.id, user.email),
      user,
    };
  }

  /**
   * Generates JWT token
   * @param userId - user's id to be encrypted in token
   * @param email -  user's email to be encrypted in token
   * @return {[json]} [Response with json object]
   */

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });
    return {
      access_token: accessToken,
    };
  }
}
