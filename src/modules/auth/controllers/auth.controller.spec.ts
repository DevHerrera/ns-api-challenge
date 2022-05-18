import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthController;
  beforeEach(async () => {
    {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthController
        ],
      }).compile();

      service = module.get<AuthController>(AuthController);
    }
  });
});
