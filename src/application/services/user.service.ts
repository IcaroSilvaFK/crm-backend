import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../repositories/userRepositoryInterface';
import { CreateUserDTO } from 'src/infra/dtos/createUser.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPresenter } from '../presenter/user.presenter';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryInterface) { }

  async store(data: CreateUserDTO) {
    try {
      const user = new UserEntity(
        data.email,
        data.password,
        data.username,
        data.role
      )

      const createdUser = await this.userRepository.store(user)

      return UserPresenter.toJson(createdUser)
    } catch (err) {
      console.log(err)
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email)

      return UserPresenter.toJson(user)
    } catch (err) {
      console.log(err)
    }
  }

}
