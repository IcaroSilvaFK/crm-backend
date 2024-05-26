import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepositoryInterface } from '../../application/repositories/userRepositoryInterface'


import { UserRepository } from './repositories/user.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository
    }
  ],
  exports: [UserRepositoryInterface],
})
export class DatabaseModule { }
