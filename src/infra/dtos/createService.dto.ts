import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServicesEntityStatus } from '../../application/entities/service.entity';

export class CreateServiceDto {
  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty()
  @IsString()
  details: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsEnum(ServicesEntityStatus)
  status: ServicesEntityStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  startDate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  endDate: string;
}
