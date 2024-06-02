import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './createAddress.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNumber()
  phoneNumber: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
