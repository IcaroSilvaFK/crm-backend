import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../../infra/database/database.module';
import { UserService } from '../../../services/user.service';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {}
