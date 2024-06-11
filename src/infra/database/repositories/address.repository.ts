import { BadRequestException } from '@nestjs/common';
import { Address } from '@prisma/client';
import { AddressEntity } from '../../../application/entities/address.entity';
import { AddressRepositoryInterface } from '../../../application/repositories/addressRepositoryInterface';

import { PrismaService } from '../prisma/prisma.service';

export class AddressRepository implements AddressRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async store(id: string, address: AddressEntity): Promise<AddressEntity> {
    await this.prismaService.address.create({
      data: {
        complement: address.complement,
        neighborhood: address.neighborhood,
        number: address.number,
        street: address.street,
        id: address.id,
        customer: {
          connect: {
            id,
          },
        },
      },
    });

    return address;
  }
  async update(id: string, address: Partial<AddressEntity>): Promise<void> {
    await this.prismaService.address.updateMany({
      where: {
        OR: [
          {
            id: id,
          },
          {
            customerId: id,
          },
        ],
      },
      data: address,
    });
  }

  async findById(id: string): Promise<AddressEntity> {
    const address = await this.prismaService.address.findFirst({
      where: {
        OR: [
          {
            id,
          },
          {
            customerId: id,
          },
        ],
      },
    });

    if (!address) throw new BadRequestException('Address not found');

    return this.generateOutput(address);
  }
  async findAll(query?: string): Promise<AddressEntity[]> {
    const result = await this.prismaService.address.findMany({
      ...(query && {
        where: {
          OR: [
            {
              neighborhood: query,
            },
            {
              street: query,
            },
            {
              complement: query,
            },
          ],
        },
      }),
      include: {
        customer: {
          select: {
            username: true,
          },
        },
      },
    });

    return result.map(this.generateOutput);
  }

  async destroy(id: string): Promise<void> {
    await this.prismaService.address.deleteMany({
      where: {
        OR: [
          {
            id,
          },
          {
            customerId: id,
          },
        ],
      },
    });
  }

  private generateOutput(address: Address): AddressEntity {
    return new AddressEntity(
      address.number,
      address.street,
      address.neighborhood,
      address.complement,
      address.id,
    );
  }
}
