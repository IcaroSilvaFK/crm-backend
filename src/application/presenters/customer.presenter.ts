import { CustomerEntity } from '../entities/customer.entity';

type CustomerPresenterOutput = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  address: {
    id: string;
    number: number;
    neighborhood: string;
    complement: string;
    street: string;
  };
};

export class CustomerPresenter {
  constructor(
    private readonly data: Partial<CustomerEntity> | Partial<CustomerEntity>[],
  ) {}

  private _toJsonArray() {
    return (this.data as Partial<CustomerEntity>[]).map(this._toJson);
  }

  private _toJson(customer: Partial<CustomerEntity>) {
    return {
      id: customer.id,
      username: customer.username,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      address: {
        ...customer.address,
      },
    };
  }

  toJson(): CustomerPresenterOutput | CustomerPresenterOutput[] {
    return Array.isArray(this.data)
      ? this._toJsonArray()
      : this._toJson(this.data);
  }
}
