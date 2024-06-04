import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CustomerRepositoryInterface } from '../repositories/customerRepositoryInterface';

import { CreateCustomerDto } from '../../infra/dtos/createCustomer.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { AddressEntity } from '../entities/address.entity';
import { CustomerPresenter } from '../presenters/customer.presenter';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import { UpdateCustomerDto } from '../../infra/dtos/updateCustomer.dto';

@Injectable()
export class CustomerService {
  private logger = new Logger();

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
      this.logger.error(err);
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async findAll(q?: string): Promise<CustomerPresenter> {
    try {
      const customers = await this.customerRepository.findAll(q);

      return new CustomerPresenter(customers);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async findById(id: string): Promise<CustomerPresenter> {
    try {
      const customer = await this.customerRepository.findById(id);

      return new CustomerPresenter(customer);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateCustomerDto): Promise<void> {
    try {
      await this.customerRepository.update(id, {
        username: data?.username,
        phoneNumber: data?.phoneNumber,
      });
    } catch (err) {
      this.logger.error(err);
      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }
      throw err;
    }
  }

  async destroy(id: string): Promise<void> {
    try {
      await this.customerRepository.destroy(id);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}
