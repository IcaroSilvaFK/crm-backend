import { Module } from '@nestjs/common';

import { CustomerController } from './customer.controller';
import { DatabaseModule } from '../../../../infra/database/database.module';
import { CustomerService } from '../../../services/customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
