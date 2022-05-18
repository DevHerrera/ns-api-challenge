import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: getRepositoryToken(User),
            useValue: {
              signIn: jest.fn(),
            },
          },
        ],
      }).compile();

      service = module.get<AuthService>(AuthService);
    }
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
