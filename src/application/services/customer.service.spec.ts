import { InMemoryCustomerRepository } from '../../infra/database/inMemory/customerRepositoryMemory';
import { InMemoryAddressRepository } from '../../infra/database/inMemory/addressRepositoryMemory';

import { UuidUtils } from '../../infra/utils/uuidUtils';
import { CustomerService } from './customer.service';
import { CustomerPresenterOutput } from '../presenters/customer.presenter';

describe('#CustomerService Test Case Suite', () => {
  let service: CustomerService;
  const addressRepository: InMemoryAddressRepository = {
    store: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  } as unknown as InMemoryAddressRepository;

  beforeEach(() => {
    service = new CustomerService(
      new InMemoryCustomerRepository(),
      addressRepository,
    );
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Should create a new customer without address', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const input = {
      username: 'test',
      phoneNumber: '6321321321',
    };

    const result = await service.store(input);

    const expected = {
      id: mockId,
      username: 'test',
      createdAt: now,
      updatedAt: now,
      phoneNumber: '6321321321',
    };

    expect(result.toJson()).toStrictEqual(expected);
  });

  it('Should create a new customer with address', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const input = {
      username: 'test',
      phoneNumber: '6321321321',
      address: {
        street: 'test',
        neighborhood: 'test',
        complement: 'test',
        number: 343,
      },
    };

    const result = await service.store(input);

    const expected = {
      id: mockId,
      username: 'test',
      createdAt: now,
      updatedAt: now,
      phoneNumber: '6321321321',
      address: {
        id: mockId,
        street: 'test',
        neighborhood: 'test',
        complement: 'test',
        number: 343,
      },
    };

    expect(result.toJson()).toStrictEqual(expected);
    expect(addressRepository.store).toHaveBeenCalled();
  });

  it('Should find customer by id', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const input = {
      username: 'test',
      phoneNumber: '6321321321',
    };

    const result = await service.store(input);

    const expected = {
      id: mockId,
      username: 'test',
      createdAt: now,
      updatedAt: now,
      phoneNumber: '6321321321',
    };

    expect(result.toJson()).toStrictEqual(expected);
  });

  it('should update customer', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const input = {
      username: 'test',
      phoneNumber: '6321321321',
    };

    const result = await service.store(input);

    const jsonResult = result.toJson() as CustomerPresenterOutput;

    await service.update(jsonResult.id, { username: 'test2' });

    const userUpdated = await service.findById(jsonResult.id);

    const expected = {
      id: mockId,
      username: 'test2',
      createdAt: now,
      updatedAt: now,
      phoneNumber: '6321321321',
    };

    expect(userUpdated.toJson()).toStrictEqual(expected);
  });

  it('Should delete customer', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const input = {
      username: 'test',
      phoneNumber: '6321321321',
    };

    const result = await service.store(input);

    const jsonResult = result.toJson() as CustomerPresenterOutput;

    await service.destroy(jsonResult.id);

    await expect(
      async () => await service.findById(jsonResult.id),
    ).rejects.toThrow();
  });
});
