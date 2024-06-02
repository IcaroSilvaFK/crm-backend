import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  complement: string;
}
