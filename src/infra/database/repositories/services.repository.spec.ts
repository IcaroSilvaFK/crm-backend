import { ServicesRepository } from './services.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UuidUtils } from '../../../infra/utils/uuidUtils';
import {
  ServiceEntity,
  ServicesEntityStatus,
} from '../../../application/entities/service.entity';

describe('#ServicesRepository test case suite', () => {
  const prisma = jestPrisma.client as PrismaService;
  let serviceRepo: ServicesRepository;

  beforeEach(() => {
    serviceRepo = new ServicesRepository(prisma);
  });

  it('Should create a new service', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);
    jest.spyOn(prisma.services, 'create').mockResolvedValue({} as any);

    const service = new ServiceEntity(
      '123-123-123-123-123',
      'Test',
      100,
      ServicesEntityStatus.DONE,
    );
    const result = await serviceRepo.store(service);
    expect(result).toBeUndefined();
  });

  it('Should find service by id', async () => {
    const mockId = '123-123-123-123-123';
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(prisma.services, 'findFirst').mockResolvedValue({
      id: mockId,
      customerId: mockId,
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: undefined,
      status: 'PENDING',
      customer: {
        id: mockId,
        username: 'Test',
        phoneNumber: '62998358542',
      } as any,
    });

    const result = await serviceRepo.findById(mockId);

    const expected = {
      customerId: '123-123-123-123-123',
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: undefined,
      status: 'PENDING',
      id: '123-123-123-123-123',
      customer: {
        username: 'Test',
        phoneNumber: '62998358542',
        address: undefined,
        id: '123-123-123-123-123',
      },
    };

    expect(result).toEqual(expected);
  });

  it('Should find all services from current customer', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(prisma.services, 'findMany').mockResolvedValue([
      {
        id: mockId,
        customerId: mockId,
        details: 'test',
        value: 2500,
        startDate: undefined,
        endDate: undefined,
        status: 'PENDING',
        customer: {
          id: mockId,
          username: 'Test',
          phoneNumber: '62998358542',
        } as any,
      },
    ] as any);

    const result = await serviceRepo.findAllByCustomer(mockId);

    const expected = [
      {
        id: mockId,
        customerId: mockId,
        details: 'test',
        value: 2500,
        startDate: undefined,
        endDate: undefined,
        status: 'PENDING',
        customer: {
          id: mockId,
          username: 'Test',
          phoneNumber: '62998358542',
        } as any,
      },
    ];

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });

  it('Should update a service', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(prisma.services, 'update').mockResolvedValue({} as any);

    const service = new ServiceEntity(
      '123-123-123-123-123',
      'Test',
      100,
      ServicesEntityStatus.DONE,
    );

    const result = await serviceRepo.update(service.id, service);

    expect(result).toBeUndefined();
  });

  it('Should find all services', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(prisma.services, 'findMany').mockResolvedValue([
      {
        id: mockId,
        customerId: mockId,
        details: 'test',
        value: 2500,
        startDate: undefined,
        endDate: undefined,
        status: 'PENDING',
        customer: {
          id: mockId,
          username: 'Test',
          phoneNumber: '62998358542',
        } as any,
      },
    ] as any);

    const result = await serviceRepo.findAll();

    const expected = [
      {
        id: mockId,
        customerId: mockId,
        details: 'test',
        value: 2500,
        startDate: undefined,
        endDate: undefined,
        status: 'PENDING',
        customer: {
          id: mockId,
          username: 'Test',
          phoneNumber: '62998358542',
        } as any,
      },
    ];

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });

  it('Should delete a service', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(prisma.services, 'delete').mockResolvedValue({} as any);

    const result = await serviceRepo.destroy(mockId);

    expect(result).toBeUndefined();
  });
});
