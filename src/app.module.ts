import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
// import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from './application/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
