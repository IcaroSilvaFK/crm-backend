import { Module } from '@nestjs/common';

import { AddressController } from './address.controller';
import { AddressService } from '../../../services/address.service';
import { CustomerService } from '../../../services/customer.service';
import { DatabaseModule } from '../../../../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressService, CustomerService],
})
export class AddressModule {}
