import { UserEntity } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract store(user: UserEntity): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findById(id: string): Promise<Partial<UserEntity>>;
  abstract update(id: string, user: Partial<UserEntity>): Promise<void>;
  abstract destroy(id: string): Promise<void>;
}
