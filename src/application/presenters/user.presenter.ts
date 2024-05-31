import { UserEntity } from '../entities/user.entity';

export class UserPresenter {
  constructor(
    private readonly data: Partial<UserEntity> | Partial<UserEntity>[],
  ) {}
  private _toJsonArray() {
    return (this.data as Partial<UserEntity>[]).map(this._toJson);
  }

  private _toJson(data: Partial<UserEntity>) {
    return {
      username: data.username,
      email: data.email,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      id: data.id,
    };
  }

  toJson() {
    return Array.isArray(this.data)
      ? this._toJsonArray()
      : this._toJson(this.data);
  }
}
