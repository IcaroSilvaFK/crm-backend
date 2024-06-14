import { Global, Module } from '@nestjs/common';

import { UserRepositoryInterface } from '../../application/repositories/userRepositoryInterface';
import { CustomerRepositoryInterface } from '../../application/repositories/customerRepositoryInterface';
import { AddressRepositoryInterface } from '../../application/repositories/addressRepositoryInterface';
import { ServicesRepositoryInterface } from '../../application/repositories/servicesRepositoryInterface';

import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { CustomerRepository } from './repositories/customer.repository';
import { AddressRepository } from './repositories/address.repository';
import { ServicesRepository } from './repositories/services.repository';

@Global()
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
    {
      provide: ServicesRepositoryInterface,
      useClass: ServicesRepository,
    },
  ],
  exports: [
    UserRepositoryInterface,
    CustomerRepositoryInterface,
    AddressRepositoryInterface,
    ServicesRepositoryInterface,
  ],
})
export class DatabaseModule {}
