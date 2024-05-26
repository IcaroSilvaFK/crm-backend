import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from './application/http/http.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
