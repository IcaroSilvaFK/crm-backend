import { Services } from '@prisma/client';

import { ServiceEntity } from 'src/application/entities/service.entity';
import { ServicesRepositoryInterface } from '../../../application/repositories/servicesRepositoryInterface';

import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export class ServicesRepository implements ServicesRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async create(service: ServiceEntity): Promise<void> {
    await this.prismaService.services.create({
      data: {
        customerId: service.customerId,
        details: service.details,
        value: service.value,
        status: service.status,
      },
    });
  }
  async update(id: string, service: Partial<ServiceEntity>): Promise<void> {
    await this.prismaService.services.update({
      where: {
        id,
      },
      data: service as Partial<Services>,
    });
  }
  async findById(id: string): Promise<Partial<ServiceEntity>> {
    const result = await this.prismaService.services.findFirst({
      where: {
        id: id,
      },
      include: {
        customer: {
          select: {
            id: true,
            username: true,
            phoneNumber: true,
          },
        },
      },
    });

    if (!result)
      throw new NotFoundException(`The service with id ${id} not exists`);

    return new ServiceEntity(
      result.customer.id,
      result.details,
      result.value,
      result.status,
      result.id,
      result?.startDate,
      result?.endDate,
    );
  }
  findAll(query?: string): Promise<ServiceEntity[]> {
    throw new Error('Method not implemented.');
  }
  destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
