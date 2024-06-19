import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddressService } from '../../../services/address.service';
import { CreateAddressDto } from '../../../../infra/dtos/createAddress.dto';

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  async store(
    @Body() data: CreateAddressDto,
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
  ) {
    await this.addressService.store(customerId, data);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: CreateAddressDto,
  ) {
    await this.addressService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.addressService.destroy(id);
  }
}
