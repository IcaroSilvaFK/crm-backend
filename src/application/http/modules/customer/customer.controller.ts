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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomerService } from '../../../services/customer.service';
import { CreateCustomerDto } from '../../../../infra/dtos/createCustomer.dto';
import { UpdateCustomerDto } from '../../../../infra/dtos/updateCustomer.dto';

@ApiTags('customers')
@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async store(@Body() data: CreateCustomerDto) {
    const result = await this.customerService.store(data);
    return result.toJson();
  }

  @Get()
  async findAll(@Query('query') query?: string) {
    const result = await this.customerService.findAll(query);
    return result.toJson();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.customerService.findById(id);
    return result.toJson();
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCustomer(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateCustomerDto,
  ) {
    await this.customerService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customerService.destroy(id);
  }
}
