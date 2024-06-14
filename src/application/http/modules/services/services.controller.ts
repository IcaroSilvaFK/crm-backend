import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateServiceDto } from '../../../../infra/dtos/createService.dto';
import { UpdateServiceDto } from '../../../../infra/dtos/updateService.dto';
import { ServicesService } from '../../../services/services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async store(@Body() data: CreateServiceDto) {
    await this.serviceService.store(data);
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.serviceService.findById(id);

    return result.toJson();
  }

  @Get('/customers/:customerId')
  async findByCustomer(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
  ) {
    const result = await this.serviceService.findByCustomer(customerId);

    return result.toJson();
  }

  @Get()
  async findAll() {
    const result = await this.serviceService.findAll();

    return result.toJson();
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateServiceDto,
  ) {
    await this.serviceService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.serviceService.destroy(id);
  }
}
