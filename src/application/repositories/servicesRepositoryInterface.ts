import { ServiceEntity } from '../entities/service.entity';

export abstract class ServicesRepositoryInterface {
  abstract store(service: ServiceEntity): Promise<void>;
  abstract update(id: string, service: Partial<ServiceEntity>): Promise<void>;
  abstract findById(id: string): Promise<Partial<ServiceEntity>>;
  abstract findAll(query?: string): Promise<ServiceEntity[]>;
  abstract destroy(id: string): Promise<void>;
}
