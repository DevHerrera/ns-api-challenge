import { IsEmail, IsNotEmpty } from 'class-validator';
export class SignInUserDto {
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  @IsEmail({
    message: 'Invalid email',
  })
  email: string;
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
