import { CreateUserDTO } from './createUser.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
