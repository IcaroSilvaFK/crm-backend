import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './createAddress.dto';

export class CreateCustomerDto {
  @IsString()
  username: string;

  @IsNumber()
  phoneNumber: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
