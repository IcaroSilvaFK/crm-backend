import {
  ServiceEntity,
  ServicesEntityStatus,
} from '../entities/service.entity';

type ServicePresenterOutput = {
  id: string;
  customerId: string;
  details: string;
  value: number;
  status: ServicesEntityStatus;
  startDate?: Date;
  endDate?: Date;
};

export class ServicePresenter {
  private readonly PERCENT_TO_CENTS = 1_000;

  constructor(
    private readonly data: Partial<ServiceEntity> | Partial<ServiceEntity>[],
  ) {
    this._toJson = this._toJson.bind(this);
  }

  toJson() {
    return Array.isArray(this.data)
      ? this._toJsonArray()
      : this._toJson(this.data);
  }

  private _toJson(service: Partial<ServiceEntity>): ServicePresenterOutput {
    const realValue = service.value / this.PERCENT_TO_CENTS;

    return {
      id: service.id,
      customerId: service.customerId,
      details: service.details,
      value: realValue,
      status: service.status,
      startDate: service?.startDate,
      endDate: service?.endDate,
    };
  }

  private _toJsonArray() {
    return (this.data as Partial<ServiceEntity>[]).map(this._toJson);
  }
}
