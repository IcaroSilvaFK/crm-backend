import { CustomerEntity } from 'src/application/entities/customer.entity';
import { CustomerRepositoryInterface } from '../../../application/repositories/customerRepositoryInterface';
import { NotFoundException } from '@nestjs/common';

export class InMemoryCustomerRepository implements CustomerRepositoryInterface {
  private customers: CustomerEntity[] = [];

  async store(customer: CustomerEntity): Promise<CustomerEntity> {
    customer.setCreatedAt = new Date();
    customer.setUpdatedAt = new Date();
    this.customers.push(customer);

    return customer;
  }
  async findAll(): Promise<CustomerEntity[]> {
    return this.customers;
  }
  async findById(id: string): Promise<CustomerEntity> {
    const customer = this.customers.find((customer) => customer.id === id);

    if (!customer) throw new NotFoundException();
    return customer;
  }
  async update(id: string, details: Partial<CustomerEntity>): Promise<void> {
    this.customers = this.customers.map((customer) =>
      customer.id === id
        ? {
            ...customer,
            ...details,
          }
        : customer,
    ) as CustomerEntity[];
  }
  async destroy(id: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }
}
