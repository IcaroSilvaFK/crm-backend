import { UserEntity } from '../../../application/entities/user.entity';
import { UserRepositoryInterface } from '../../../application/repositories/userRepositoryInterface';


export class UserRepositoryInMemory implements UserRepositoryInterface {
  private users: UserEntity[] = [];


  async store(user: UserEntity): Promise<UserEntity> {

    this.users.push(user);

    user.setCratedAt = new Date();
    user.setUpdatedAt = new Date();

    return user;
  }


  async findByEmail(email: string): Promise<UserEntity> {

    const user = this.users.find(u => u.email === email);


    return user!;
  }

  async findById(id: string): Promise<Partial<UserEntity>> {
    const user = this.users.find(u => u.id === id);


    return user!;
  }


  async update(id: string, user: Partial<UserEntity>): Promise<void> {
    this.users = this.users.map(u => u.id === id ? {
      ...u,
      ...user,
    } : u) as User;
  }
}
