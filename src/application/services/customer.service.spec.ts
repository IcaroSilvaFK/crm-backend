import { InMemoryCustomerRepository } from '../../infra/database/inMemory/customerRepositoryMemory';
import { UuidUtils } from '../../infra/utils/uuidUtils';

import { CustomerService } from './customer.service';

describe('#CustomerService Test Case Suite', () => {
  let service: CustomerService;

  beforeEach(() => {
    service = new CustomerService(new InMemoryCustomerRepository());
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
      address: {},
    };

    expect(result.toJson()).toStrictEqual(expected);
  });
});
