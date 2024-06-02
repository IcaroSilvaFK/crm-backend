import { AddressEntity } from './address.entity';
import { UuidUtils } from '../../infra/utils/uuidUtils';

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
    this.id = id ?? UuidUtils.generateUUID();
  }

  set setAddress(address: AddressEntity) {
    this.address = address;
  }

  set setCreatedAt(date: Date) {
    this.createdAt = date;
  }

  set setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
