import { InMemoryServiceRepository } from '../../infra/database/inMemory/servicesRepositoryMemory';
import { ServicesService } from './services.service';
import { CustomerEntity } from '../entities/customer.entity';
import {
  ServiceEntity,
  ServicesEntityStatus,
} from '../entities/service.entity';
import { UuidUtils } from '../../infra/utils/uuidUtils';

describe('#ServicesService test case suite', () => {
  let servicesService: ServicesService;
  let inMemoryRepository: InMemoryServiceRepository;

  afterEach(() => jest.clearAllMocks());

  beforeEach(() => {
    inMemoryRepository = new InMemoryServiceRepository();
    servicesService = new ServicesService(inMemoryRepository);
  });

  it('Should be able to create new service', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const fnMock = jest.fn();
    jest.spyOn(inMemoryRepository, 'store').mockImplementation(fnMock);

    const customer = new CustomerEntity('123', '123', '123');

    await servicesService.store({
      customerId: customer.id,
      details: 'test',
      value: 2500,
      status: ServicesEntityStatus.PENDING,
    });

    const expected = {
      customerId: '123',
      details: 'test',
      value: 2500000,
      startDate: undefined,
      endDate: undefined,
      status: 'PENDING',
      id: mockId,
    };

    expect(fnMock).toHaveBeenCalled();
    expect(fnMock).toHaveBeenCalledWith(expected);
  });

  it('Should be find all services', async () => {
    const mockReturn = [
      new ServiceEntity(
        '123',
        'test',
        2500,
        ServicesEntityStatus.DONE,
        undefined,
        undefined,
      ),
      new ServiceEntity(
        '123',
        'test',
        2500,
        ServicesEntityStatus.DONE,
        undefined,
        undefined,
      ),
    ];

    jest.spyOn(inMemoryRepository, 'findAll').mockResolvedValue(mockReturn);

    const allServices = await servicesService.findAll();

    const expected = [
      {
        id: '123-123-123-123-123',
        customerId: '123',
        details: 'test',
        value: 2.5,
        status: 'DONE',
        startDate: undefined,
        endDate: undefined,
      },
      {
        id: '123-123-123-123-123',
        customerId: '123',
        details: 'test',
        value: 2.5,
        status: 'DONE',
        startDate: undefined,
        endDate: undefined,
      },
    ];

    expect(allServices.toJson()).toEqual(expected);
  });

  it('Should find service by id', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    jest.spyOn(inMemoryRepository, 'findById').mockResolvedValue({
      id: mockId,
      customerId: mockId,
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: undefined,
      status: ServicesEntityStatus.PENDING,
    });

    const service = await servicesService.findById(mockId);

    const expected = {
      id: mockId,
      customerId: mockId,
      details: 'test',
      value: 2.5,
      status: 'PENDING',
      startDate: undefined,
      endDate: undefined,
    };

    expect(service.toJson()).toEqual(expected);
  });

  it('Should be called findAllByCustomer', async () => {
    const mockId = '123-123-123-123-123';
    const findAllMockFn = jest.fn();

    jest
      .spyOn(inMemoryRepository, 'findAllByCustomer')
      .mockImplementation(findAllMockFn);

    await servicesService.findByCustomer(mockId);

    expect(findAllMockFn).toHaveBeenCalled();
    expect(findAllMockFn).toHaveBeenCalledWith(mockId);
  });

  it('Should be called update', async () => {
    const mockId = '123-123-123-123-123';
    const updateMockFn = jest.fn();
    const findByIdMockFn = jest.fn();

    jest.spyOn(inMemoryRepository, 'update').mockImplementation(updateMockFn);
    jest
      .spyOn(inMemoryRepository, 'findById')
      .mockImplementation(findByIdMockFn);

    const input = {
      details: 'test',
      value: 2500,
      status: ServicesEntityStatus.PENDING,
    };

    await servicesService.update(mockId, input);

    const expected = {
      details: 'test',
      value: 2500 * 1000,
      status: ServicesEntityStatus.PENDING,
    };

    expect(updateMockFn).toHaveBeenCalled();
    expect(updateMockFn).toHaveBeenCalledWith(mockId, expected);
    expect(findByIdMockFn).toHaveBeenCalled();
    expect(findByIdMockFn).toHaveBeenCalledWith(mockId);
  });

  it('Should be called destroy', async () => {
    const mockId = '123-123-123-123-123';
    const destroyMockFn = jest.fn();

    jest.spyOn(inMemoryRepository, 'destroy').mockImplementation(destroyMockFn);

    await servicesService.destroy(mockId);

    expect(destroyMockFn).toHaveBeenCalled();
    expect(destroyMockFn).toHaveBeenCalledWith(mockId);
  });
});
