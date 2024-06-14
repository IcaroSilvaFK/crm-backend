import { Module } from '@nestjs/common';

import { CustomerController } from './customer.controller';
import { CustomerService } from '../../../services/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
