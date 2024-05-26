import { AddressEntity } from './address.entity';

export class CustomerEntity {
  id: string;
  username: string;
  phoneNumber: number;
  createdAt: Date;
  updatedAt: Date;
  address?: AddressEntity;

  constructor(
    username: string,
    phoneNumber: number,
    id?: string,
    address?: AddressEntity,
  ) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.id = id;
  }

  set setAddress(address: AddressEntity) {
    this.address = address;
  }

  set setId(id: string) {
    this.id = id;
  }
}
