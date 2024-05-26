import { UserEntity } from '../entities/user.entity'

export class UserPresenter {

  static toJson(user: UserEntity) {
    return {
      username: user.username,
      email: user.email,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      id: user.id
    }
  }
}
