import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepositoryInterface } from '../../application/repositories/userRepositoryInterface';
import { CustomerRepositoryInterface } from '../../application/repositories/customerRepositoryInterface';
import { AddressRepositoryInterface } from '../../application/repositories/addressRepositoryInterface';

import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { AddressRepository } from './repositories/address.repository';

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
    {
      provide: AddressRepositoryInterface,
      useClass: AddressRepository,
    },
  ],
  exports: [
    UserRepositoryInterface,
    CustomerRepositoryInterface,
    AddressRepositoryInterface,
  ],
})
export class DatabaseModule {}
