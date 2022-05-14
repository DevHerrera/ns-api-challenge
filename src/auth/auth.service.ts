import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UsersRepository } from 'src/repositories/users.repository';
import { SignUpUserDto } from './dto/signUpUser.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  public async test(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async signUp(userData: SignUpUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (user) {
      throw new ConflictException('Email already in use');
    }

    return this.userRepository.save(userData);
  }
}
