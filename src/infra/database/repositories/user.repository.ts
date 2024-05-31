import { UserRepositoryInterface } from '../../../application/repositories/userRepositoryInterface';
import { UserEntity, UserRoles } from '../../../application/entities/user.entity'
import { PrismaService } from '../prisma/prisma.service'
import { BadRequestException, NotFoundException } from '@nestjs/common';


export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) { }

  async store(user: UserEntity): Promise<UserEntity> {
    const result = await this.prismaService.users.create({
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
      }
    })

    user.setCratedAt = result.createdAt
    user.setUpdatedAt = result.updatedAt

    return user
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.prismaService.users.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new BadRequestException("User or password not valid")
    }

    return new UserEntity(
      user.email,
      user.password,
      user.username,
      user.role as UserRoles,
      user.id,
      user.createdAt,
      user.updatedAt
    )
  }

  async findById(id: string): Promise<Partial<UserEntity>> {
    const user = await this.prismaService.users.findFirst({
      where: {
        id,
      }
    })

    if (!user) {
      throw new NotFoundException(`The user with id ${id} not exists.`)
    }

    return new UserEntity(
      user.email,
      user.password,
      user.username,
      user.role as UserRoles,
      user.id,
      user.createdAt,
      user.updatedAt
    )
  }

  async update(id: string, user: Partial<UserEntity>): Promise<void> {
    await this.prismaService.users.update({
      where: {
        id,
      },
      data: user
    })
  }

  async destroy(id: string): Promise<void> {
    await this.prismaService.users.delete({
      where: {
        id
      }
    })
  }

}

