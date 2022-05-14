import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/repositories/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService],
})
export class AuthModule {}
