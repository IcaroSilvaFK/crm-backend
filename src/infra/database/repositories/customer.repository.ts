import { AddressEntity } from '../../../application/entities/address.entity';
import { CustomerEntity } from '../../../application/entities/customer.entity';
import { CustomerRepositoryInterface } from '../../../application/repositories/customerRepositoryInterface';

import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async store(customer: CustomerEntity): Promise<CustomerEntity> {
    const result = await this.prismaService.customers.create({
      data: {
        id: customer.id,
        username: customer.username,
        phoneNumber: customer.phoneNumber,
      },
    });

    customer.setUpdatedAt = result.updatedAt;
    customer.setCreatedAt = result.updatedAt;

    return customer;
  }
  async findAll(query?: string): Promise<CustomerEntity[]> {
    const result = await this.prismaService.customers.findMany({
      ...(query && {
        where: {
          username: query,
        },
      }),
      include: {
        address: {
          select: {
            complement: true,
            customerId: true,
            neighborhood: true,
            number: true,
            street: true,
            id: true,
          },
        },
      },
    });

    return result.map(
      (customer) =>
        new CustomerEntity(
          customer.username,
          customer.phoneNumber,
          customer.id,
          new AddressEntity(
            customer?.address.number,
            customer?.address.neighborhood,
            customer?.address.complement,
            customer?.address.id,
          ),
        ),
    );
  }
  async findById(id: string): Promise<CustomerEntity> {
    const customer = await this.prismaService.customers.findFirst({
      where: {
        id,
      },
      include: {
        address: {
          select: {
            neighborhood: true,
            number: true,
            street: true,
            complement: true,
            id: true,
          },
        },
      },
    });

    if (!customer)
      throw new NotFoundException(`The customer with id ${id} not exists`);

    return new CustomerEntity(
      customer.username,
      customer.phoneNumber,
      customer.id,
      new AddressEntity(
        customer.address.number,
        customer.address.street,
        customer.address.neighborhood,
        customer.address.complement,
        customer.address.id,
      ),
    );
  }
  async update(id: string, details: Partial<CustomerEntity>): Promise<void> {
    await this.prismaService.customers.update({
      where: {
        id,
      },
      data: {
        username: details?.username,
        phoneNumber: details?.phoneNumber,
      },
    });
  }
  async destroy(id: string): Promise<void> {
    await this.prismaService.customers.delete({
      where: {
        id,
      },
    });
  }
}
