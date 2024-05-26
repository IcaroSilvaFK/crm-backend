import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  number: number;

  @IsString()
  neighborhood: string;

  @IsString()
  complement: string;
}
