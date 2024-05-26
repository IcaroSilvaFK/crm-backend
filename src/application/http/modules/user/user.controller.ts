import { Body, Controller } from '@nestjs/common'

import { CreateUserDTO } from '../../../../infra/dtos/createUser.dto'

@Controller("/users")
export class UsersController {


  async createNewUser(@Body() data: CreateUserDTO) {

  }
}
