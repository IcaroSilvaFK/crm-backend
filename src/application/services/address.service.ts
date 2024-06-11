import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { AddressEntity } from '../entities/address.entity';

import { AddressRepositoryInterface } from '../repositories/addressRepositoryInterface';
import { CreateAddressDto } from '../../infra/dtos/createAddress.dto';
import { UpdateAddressDto } from '../../infra/dtos/updateAddress.dto';
import { CustomerService } from './customer.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AddressService {
  private readonly logger = new Logger();
  constructor(
    private readonly addressRepository: AddressRepositoryInterface,
    private readonly customerService: CustomerService,
  ) {}

  async store(customerId: string, data: CreateAddressDto): Promise<void> {
    try {
      await this.checkIfCustomerExists(customerId);
      const address = new AddressEntity(
        data.number,
        data.street,
        data.neighborhood,
        data.complement,
      );
      await this.addressRepository.store(customerId, address);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateAddressDto): Promise<void> {
    try {
      await this.addressRepository.update(id, data);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async destroy(id: string): Promise<void> {
    try {
      await this.addressRepository.destroy(id);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  private async checkIfCustomerExists(customerId: string): Promise<void> {
    const customer = await this.customerService.findById(customerId);

    if (!customer) throw new BadRequestException('Customer not found');
  }
}
