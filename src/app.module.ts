import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from './application/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
