import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from './application/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
