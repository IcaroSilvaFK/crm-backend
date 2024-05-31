import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/userRepositoryInterface';
import { CreateUserDTO } from '../../infra/dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPresenter } from '../presenters/user.presenter';
import { UpdateUserDTO } from '../../infra/dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async store(data: CreateUserDTO): Promise<UserPresenter> {
    try {
      const user = new UserEntity(
        data.email,
        data.password,
        data.username,
        data.role,
      );

      await user.ensurePassword();

      const createdUser = await this.userRepository.store(user);

      return new UserPresenter(createdUser);
    } catch (err) {
      console.log(err);
    }
  }

  async findByEmail(email: string): Promise<UserPresenter> {
    try {
      const user = await this.userRepository.findByEmail(email);

      return new UserPresenter(user);
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: string): Promise<UserPresenter> {
    try {
      const user = await this.userRepository.findById(id);
      return new UserPresenter(user);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    try {
      await this.userRepository.findById(id);
      await this.userRepository.update(id, data);
    } catch (err) {
      console.log(err);
    }
  }

  async destroy(id: string): Promise<void> {
    try {
      await this.userRepository.destroy(id);
    } catch (err) {
      console.log(err);
    }
  }
}
