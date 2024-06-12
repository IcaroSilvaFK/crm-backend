import { UuidUtils } from './../../infra/utils/uuidUtils';
import { CustomerEntity } from './customer.entity';

export enum ServicesEntityStatus {
  DONE = 'DONE',
  PENDING = 'PENDING',
  PROGRESS = 'PROGRESS',
}

export class ServiceEntity {
  id: string;
  customerId: string;
  details: string;
  value: number;
  startDate: Date;
  endDate: Date;
  status: ServicesEntityStatus;
  customer: CustomerEntity;

  constructor(
    customerId: string,
    details: string,
    value: number,
    status: ServicesEntityStatus = ServicesEntityStatus.PENDING,
    id?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    this.customerId = customerId;
    this.details = details;
    this.value = value;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.id = id ?? UuidUtils.generateUUID();
  }

  set setStartDate(date: Date) {
    this.startDate = date;
  }
  set setEndDate(date: Date) {
    this.endDate = date;
  }

  set setCustomer(customer: CustomerEntity) {
    this.customer = customer;
  }
}
