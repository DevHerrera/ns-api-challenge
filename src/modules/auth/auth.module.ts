import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/repositories/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}