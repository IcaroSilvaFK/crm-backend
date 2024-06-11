import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AddressModule } from './modules/address/address.module';

@Module({
  imports: [UserModule, CustomerModule, AddressModule],
})
export class HttpModule {}
