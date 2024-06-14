import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ServicesRepositoryInterface } from '../repositories/servicesRepositoryInterface';
import { CreateServiceDto } from '../../infra/dtos/createService.dto';
import { ServiceEntity } from '../entities/service.entity';
import { ServicePresenter } from '../presenters/service.presenter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateServiceDto } from '../../infra/dtos/updateService.dto';

@Injectable()
export class ServicesService {
  private logger = new Logger();
  constructor(
    private readonly servicesRepository: ServicesRepositoryInterface,
  ) {}

  async store(data: CreateServiceDto) {
    try {
      const service = new ServiceEntity(
        data.customerId,
        data.details,
        data.value,
        data.status,
      );

      await this.servicesRepository.store(service);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof PrismaClientKnownRequestError)
        throw new BadRequestException(err.message);

      throw err;
    }
  }

  async findAll() {
    try {
      const result = await this.servicesRepository.findAll();

      return new ServicePresenter(result);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientKnownRequestError)
        throw new InternalServerErrorException();

      throw err;
    }
  }

  async findById(id: string) {
    try {
      const service = await this.servicesRepository.findById(id);

      return new ServicePresenter(service);
    } catch (err) {
      this.logger.error(err);
      if (err instanceof PrismaClientKnownRequestError)
        throw new InternalServerErrorException();

      throw err;
    }
  }

  async findByCustomer(customerId: string) {
    try {
      const services =
        await this.servicesRepository.findAllByCustomer(customerId);

      return new ServicePresenter(services);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientKnownRequestError)
        throw new InternalServerErrorException();

      throw err;
    }
  }

  async update(id: string, data: UpdateServiceDto) {
    try {
      await this.servicesRepository.findById(id);

      const input = {
        ...data,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
      };

      await this.servicesRepository.update(id, input);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientKnownRequestError)
        throw new InternalServerErrorException();

      throw err;
    }
  }

  async destroy(id: string) {
    try {
      await this.servicesRepository.findById(id);
      await this.servicesRepository.destroy(id);
    } catch (err) {
      this.logger.error(err);

      if (err instanceof PrismaClientKnownRequestError)
        throw new InternalServerErrorException();

      throw err;
    }
  }
}
