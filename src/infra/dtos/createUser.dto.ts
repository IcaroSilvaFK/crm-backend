import { UserRoles } from '../../application/entities/user.entity';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
