import { AddressEntity } from '../../../application/entities/address.entity';
import { AddressRepositoryInterface } from '../../../application/repositories/addressRepositoryInterface';

export class InMemoryAddressRepository implements AddressRepositoryInterface {
  private addresses: { [key: string]: AddressEntity } = {};

  async store(userId: string, address: AddressEntity): Promise<AddressEntity> {
    this.addresses[userId] = address;

    return address;
  }

  async update(id: string, address: Partial<AddressEntity>): Promise<void> {
    if (!this.addresses[id]) return;
    this.addresses[id] = {
      ...this.addresses[id],
      ...address,
    };
  }

  async findById(id: string): Promise<AddressEntity> {
    return this.addresses[id];
  }

  async findAll(query?: string): Promise<AddressEntity[]> {
    const entries = Object.entries(this.addresses);

    const result: AddressEntity[] = [];

    for (const [, v] of entries) {
      if (query) {
        if (
          v.street.includes(query) ||
          v.neighborhood.includes(query) ||
          v.complement.includes(query)
        ) {
          result.push(v);
        }
      }
      if (!query) result.push(v);
    }

    return result;
  }

  async destroy(id: string): Promise<void> {
    Reflect.deleteProperty(this.addresses, id);
  }
}
