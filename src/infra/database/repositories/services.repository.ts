import { Services } from '@prisma/client';

import {
  ServiceEntity,
  ServicesEntityStatus,
} from '../../../application/entities/service.entity';
import { ServicesRepositoryInterface } from '../../../application/repositories/servicesRepositoryInterface';

import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../../../application/entities/customer.entity';

export class ServicesRepository implements ServicesRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async store(service: ServiceEntity): Promise<void> {
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

    const service = new ServiceEntity(
      result.customer.id,
      result.details,
      result.value,
      result.status as ServicesEntityStatus,
      result.id,
      result?.startDate,
      result?.endDate,
    );

    service.setCustomer = new CustomerEntity(
      result.customer.username,
      result.customer.phoneNumber,
      result.customer.id,
    );

    return service;
  }

  async findAll(query?: string): Promise<ServiceEntity[]> {
    const result = await this.prismaService.services.findMany({
      where: {
        ...(query && {
          OR: [
            {
              details: {
                contains: query,
              },
            },
          ],
        }),
      },
      include: {
        customer: {
          select: {
            username: true,
            id: true,
            phoneNumber: true,
          },
        },
      },
    });

    return result.map((service) => {
      const currentService = new ServiceEntity(
        service.customerId,
        service.details,
        service.value,
        service.status as ServicesEntityStatus,
        service.id,
        service?.startDate,
        service?.endDate,
      );

      currentService.setCustomer = new CustomerEntity(
        service.customer.username,
        service.customer.phoneNumber,
        service.customer.id,
      );

      return currentService;
    });
  }

  async destroy(id: string): Promise<void> {
    await this.prismaService.services.delete({
      where: {
        id,
      },
    });
  }
}
