import { AddressRepository } from './address.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerEntity } from '../../../application/entities/customer.entity';
import { AddressEntity } from '../../../application/entities/address.entity';

import { CustomerRepository } from '../repositories/customer.repository';

import { UuidUtils } from '../../../infra/utils/uuidUtils';
import { PrismaClient, Address } from '@prisma/client';

describe('#AddressRepository Suite Test Case', () => {
  const prisma = jestPrisma.client as PrismaClient;
  let addressRepo: AddressRepository;
  let customerRepo: CustomerRepository;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    addressRepo = new AddressRepository(prisma as unknown as PrismaService);
    customerRepo = new CustomerRepository(prisma as unknown as PrismaService);

    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('Should create a new address when customer exists', async () => {
    const customer = new CustomerEntity('Test', '62998358542');

    const mockId = '123-123-123-123-123';

    await customerRepo.store(customer);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );

    const result = await addressRepo.store(customer.id, address);

    const expected = {
      id: mockId,
      number: 123,
      street: 'Street',
      neighborhood: 'Neighborhood',
      complement: 'Complement',
    };

    expect(result).toEqual(expected);
  });

  it('Should find address using customer id', async () => {
    const customer = new CustomerEntity('Test', '62998358542');

    const mockId = '123-123-123-123-123';

    await customerRepo.store(customer);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );

    await addressRepo.store(customer.id, address);

    const result = await addressRepo.findById(customer.id);

    const expected = {
      id: mockId,
      number: 123,
      street: 'Street',
      neighborhood: 'Neighborhood',
      complement: 'Complement',
    };

    expect(result).toEqual(expected);
  });

  it('Should update fields from address when pass valid address and user exists', async () => {
    const customer = new CustomerEntity('Test', '62998358542');

    const mockId = '123-123-123-123-123';

    await customerRepo.store(customer);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );

    await addressRepo.store(customer.id, address);

    const newAddress = new AddressEntity(
      123,
      'Street 2',
      'Neighborhood 2',
      'Complement 2',
    );

    await addressRepo.update(customer.id, newAddress);

    const result = await addressRepo.findById(mockId);

    const expected = {
      id: mockId,
      number: 123,
      street: 'Street 2',
      neighborhood: 'Neighborhood 2',
      complement: 'Complement 2',
    };

    expect(result).toEqual(expected);
  });

  it.skip('Should find all registers without filters', async () => {
    const allMockReturns: Address[] = [
      {
        id: '123-123-123-123-123',
        number: 123,
        street: 'Street',
        neighborhood: 'Neighborhood',
        complement: 'Complement',
        customerId: '123-123-123-123-123',
      },

      {
        id: '123-123-123-123-123',
        number: 123,
        street: 'Street 2',
        neighborhood: 'Neighborhood 2',
        complement: 'Complement 2',
        customerId: '123-123-123-123-123',
      },
    ];

    jest.spyOn(prisma.address, 'findMany').mockResolvedValue(allMockReturns);

    const result = await addressRepo.findAll();

    const expected = allMockReturns.map(
      (address) =>
        new AddressEntity(
          address.number,
          address.street,
          address.neighborhood,
          address.complement,
          address.id,
        ),
    );

    expect(result).toEqual(expected);
    expect(prisma.address).toHaveBeenCalled();
  });

  it('Should destroy address when pass valid address and user exists', async () => {
    const customer = new CustomerEntity('Test', '62998358542');

    const mockId = '123-123-123-123-123';

    await customerRepo.store(customer);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );

    await addressRepo.store(customer.id, address);

    await addressRepo.destroy(mockId);

    await expect(
      async () => await addressRepo.findById(mockId),
    ).rejects.toThrow();
  });
});
