import { CustomerEntity } from '../entities/customer.entity';

export abstract class CustomerRepositoryInterface {
  abstract store(customer: CustomerEntity): Promise<CustomerEntity>;
  abstract findAll(query?: string): Promise<CustomerEntity[]>;
  abstract findById(id: string): Promise<CustomerEntity>;
  abstract update(id: string, details: Partial<CustomerEntity>): Promise<void>;
  abstract destroy(id: string): Promise<void>;
}
