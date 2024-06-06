import { CustomerEntity } from '../entities/customer.entity';

type CustomerPresenterOutput = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
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

  private _toJsonArray(): CustomerPresenterOutput[] {
    return (this.data as Partial<CustomerEntity>[]).map(this._toJson);
  }

  private _toJson(customer: Partial<CustomerEntity>): CustomerPresenterOutput {
    return {
      id: customer.id,
      username: customer.username,
      createdAt: customer?.createdAt,
      updatedAt: customer?.updatedAt,
      phoneNumber: customer.phoneNumber,
      ...(customer?.address && {
        address: {
          ...customer?.address,
        },
      }),
    };
  }

  toJson(): CustomerPresenterOutput | CustomerPresenterOutput[] {
    return Array.isArray(this.data)
      ? this._toJsonArray()
      : this._toJson(this.data);
  }
}
