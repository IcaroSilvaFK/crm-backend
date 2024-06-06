import { UserEntity } from '../entities/user.entity';

export type UserPresenterOutput = {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
};

export class UserPresenter {
  constructor(
    private readonly data: Partial<UserEntity> | Partial<UserEntity>[],
  ) {}
  private _toJsonArray(): UserPresenterOutput[] {
    return (this.data as Partial<UserEntity>[]).map(this._toJson);
  }

  private _toJson(data: Partial<UserEntity>): UserPresenterOutput {
    return {
      username: data.username,
      email: data.email,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      id: data.id,
    };
  }

  toJson(): UserPresenterOutput | UserPresenterOutput[] {
    return Array.isArray(this.data)
      ? this._toJsonArray()
      : this._toJson(this.data);
  }
}
