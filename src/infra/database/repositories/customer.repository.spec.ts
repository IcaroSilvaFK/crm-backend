import { PrismaClient } from '@prisma/client';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerEntity } from '../../../application/entities/customer.entity';

import { UuidUtils } from '../../utils/uuidUtils';

describe('#CustomerRepository Suite Test Case', () => {
  const prisma = jestPrisma.client as PrismaClient;
  let customerRepo: CustomerRepository;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    customerRepo = new CustomerRepository(prisma as unknown as PrismaService);

    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Should create a new user', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const customer = new CustomerEntity('Test', '62998358542');

    const result = await customerRepo.store(customer);

    expect(result.address).toBeUndefined();
    expect(result.username).toBe('Test');
    expect(result.phoneNumber).toBe('62998358542');
    expect(result.id).toBe(mockId);
    expect(result.createdAt).toBeDefined();
    expect(result.createdAt).toBeDefined();
  });
});
