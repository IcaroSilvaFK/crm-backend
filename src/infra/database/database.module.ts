import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepositoryInterface } from '../../application/repositories/userRepositoryInterface';
import { CustomerRepositoryInterface } from '../../application/repositories/customerRepositoryInterface';

import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
    {
      provide: CustomerRepositoryInterface,
      useClass: CustomerRepository,
    },
  ],
  exports: [UserRepositoryInterface, CustomerRepositoryInterface],
})
export class DatabaseModule {}
