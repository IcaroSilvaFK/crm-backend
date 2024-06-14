import { ServiceEntity } from 'src/application/entities/service.entity';
import { ServicesRepositoryInterface } from '../../../application/repositories/servicesRepositoryInterface';

export class InMemoryServiceRepository implements ServicesRepositoryInterface {
  private services: ServiceEntity[] = [];

  async store(service: ServiceEntity): Promise<void> {
    this.services.push(service);
  }

  async update(id: string, service: Partial<ServiceEntity>): Promise<void> {
    this.services = this.services.map((s) =>
      s.id === id
        ? {
            ...s,
            ...service,
          }
        : s,
    ) as ServiceEntity[];
  }

  async findById(id: string): Promise<Partial<ServiceEntity>> {
    return this.services.find((s) => s.id === id);
  }

  async findAll(): Promise<ServiceEntity[]> {
    return this.services;
  }

  async destroy(id: string): Promise<void> {
    this.services = this.services.filter((s) => s.id !== id);
  }

  async findAllByCustomer(customerId: string): Promise<ServiceEntity[]> {
    return this.services.filter((service) => service.customerId === customerId);
  }
}
