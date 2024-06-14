import { AddressEntity } from '../entities/address.entity';

export abstract class AddressRepositoryInterface {
  abstract store(
    userId: string,
    address: AddressEntity,
  ): Promise<AddressEntity>;
  abstract update(id: string, address: Partial<AddressEntity>): Promise<void>;
  abstract findById(id: string): Promise<AddressEntity>;
  abstract findAll(query?: string): Promise<AddressEntity[]>;
  abstract destroy(id: string): Promise<void>;
}
