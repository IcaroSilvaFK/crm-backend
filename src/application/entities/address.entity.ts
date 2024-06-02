import { UuidUtils } from '../../infra/utils/uuidUtils';

export class AddressEntity {
  id: string;
  number: number;
  neighborhood: string;
  complement: string;
  street: string;

  constructor(
    number: number,
    street: string,
    neighborhood: string,
    complement: string,
    id?: string,
  ) {
    this.number = number;
    this.street = street;
    this.neighborhood = neighborhood;
    this.complement = complement;
    this.id = id ?? UuidUtils.generateUUID();
  }
}
