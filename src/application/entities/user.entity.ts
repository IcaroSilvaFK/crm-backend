import { HashUtils } from '../../infra/utils/hashUtil';
import { UuidUtils } from '../../infra/utils/uuidUtils';
import { UserEntityInvalidError } from '../errors/userEntityInvalidError';

export enum UserRoles {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  USER = 'USER',
}

export class UserEntity {
  id: string;
  role: UserRoles;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    email: string,
    password: string,
    username: string,
    role: UserRoles,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.id = id ?? UuidUtils.generateUUID();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  set setCratedAt(date: Date) {
    this.createdAt = date;
  }

  set setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }

  async ensurePassword() {
    this.password = await HashUtils.makeHash(this.password);
  }

  validate() {
    if (!this.email || !this.password || !this.username) {
      throw new UserEntityInvalidError('Usuário sem campos obrigatórios');
    }
  }
}
