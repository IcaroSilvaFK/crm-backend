import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AddressModule } from './modules/address/address.module';
import { ServiceModule } from './modules/services/services.module';

@Module({
  imports: [UserModule, CustomerModule, AddressModule, ServiceModule],
})
export class HttpModule {}
