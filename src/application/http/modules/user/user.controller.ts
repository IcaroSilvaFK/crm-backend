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

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createNewUser(@Body() data: CreateUserDTO) {
    const result = await this.userService.store(data);
    return result;
  }

  @Get('/:id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.userService.findById(id);
    return result;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDTO,
  ) {
    await this.userService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.destroy(id);
  }
}
