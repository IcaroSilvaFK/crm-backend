import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ServicesEntityStatus } from 'src/application/entities/service.entity';

export class CreateServiceDto {
  @IsUUID()
  customerId: string;

  @IsString()
  details: string;

  @IsNumber()
  value: number;

  @IsEnum(ServicesEntityStatus)
  status: ServicesEntityStatus;

  @IsOptional()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate: string;
}
