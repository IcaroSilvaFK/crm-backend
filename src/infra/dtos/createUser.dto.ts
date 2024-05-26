import { UserRoles } from 'src/application/entities/user.entity';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
