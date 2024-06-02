import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '../../../../infra/dtos/createUser.dto';
import { UpdateUserDTO } from '../../../../infra/dtos/updateUser.dto';
import { UserService } from '../../../services/user.service';
import { UserPresenterOutput } from '../../../../application/presenters/user.presenter';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createNewUser(
    @Body() data: CreateUserDTO,
  ): Promise<UserPresenterOutput> {
    const result = await this.userService.store(data);
    return result.toJson() as UserPresenterOutput;
  }

  @Get('/:id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.findById(id);
    return result.toJson();
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDTO,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.destroy(id);
  }
}
