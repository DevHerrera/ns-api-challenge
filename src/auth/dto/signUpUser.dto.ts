import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Role } from 'src/models/role.entity';
export class SignUpUserDto {
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  @IsEmail({
    message: 'Invalid email',
  })
  email: string;
  @IsNumber({
    allowNaN: false,
  })
  roleId: Role;
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;
  @IsOptional()
  photoUrl: string;
}
