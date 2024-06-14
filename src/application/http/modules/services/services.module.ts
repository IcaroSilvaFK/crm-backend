import { Module } from '@nestjs/common';

import { ServicesService } from '../../../../application/services/services.service';
import { ServicesController } from './services.controller';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServiceModule {}
