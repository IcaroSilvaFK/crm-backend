import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/userRepositoryInterface';
import { CreateUserDTO } from '../../infra/dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPresenter } from '../presenters/user.presenter';
import { UpdateUserDTO } from '../../infra/dtos/updateUser.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserPresenter> {
    try {
      const user = await this.userRepository.findByEmail(email);

      return new UserPresenter(user);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async findById(id: string): Promise<UserPresenter> {
    try {
      const user = await this.userRepository.findById(id);
      return new UserPresenter(user);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }
      throw err;
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    try {
      await this.userRepository.findById(id);
      await this.userRepository.update(id, data);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }

  async destroy(id: string): Promise<void> {
    try {
      await this.userRepository.findById(id);
      await this.userRepository.destroy(id);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        throw new InternalServerErrorException();
      }

      throw err;
    }
  }
}
