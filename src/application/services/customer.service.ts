import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CustomerRepositoryInterface } from '../repositories/customerRepositoryInterface';

import { CreateCustomerDto } from '../../infra/dtos/createCustomer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { AddressEntity } from '../entities/address.entity';
import { CustomerPresenter } from '../presenters/customer.presenter';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async store(input: CreateCustomerDto): Promise<CustomerPresenter> {
    try {
      const customer = new CustomerEntity(input.username, input.phoneNumber);

      if (input.address) {
        customer.setAddress = new AddressEntity(
          input.address.number,
          input.address.street,
          input.address.neighborhood,
          input.address.complement,
        );
      }

      const result = await this.customerRepository.store(customer);

      return new CustomerPresenter(result);
    } catch (err) {
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}
