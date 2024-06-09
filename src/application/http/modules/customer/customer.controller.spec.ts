import { InMemoryCustomerRepository } from '../../../../infra/database/inMemory/customerRepositoryMemory';
import { InMemoryAddressRepository } from '../../../../infra/database/inMemory/addressRepositoryMemory';
import { CustomerService } from '../../../services/customer.service';
import { CustomerController } from './customer.controller';
import { UuidUtils } from '../../../../infra/utils/uuidUtils';

describe('#CustomerController', () => {
  let inMemoryDb: InMemoryCustomerRepository;
  let inMemoryAddressDb: InMemoryAddressRepository;
  let customerService: CustomerService;
  let customerController: CustomerController;

  beforeEach(() => {
    jest.useFakeTimers();
    inMemoryDb = new InMemoryCustomerRepository();
    inMemoryAddressDb = new InMemoryAddressRepository();
    customerService = new CustomerService(inMemoryDb, inMemoryAddressDb);
    customerController = new CustomerController(customerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new customer without address', async () => {
    const mockId = '123-123-123-123-123';
    const now = new Date();

    jest.setSystemTime(now);

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const result = await customerController.store({
      phoneNumber: '62998358542',
      username: 'test',
    });

    const expected = {
      id: mockId,
      createdAt: now,
      updatedAt: now,
      phoneNumber: '62998358542',
      username: 'test',
    };

    expect(result).toEqual(expected);
  });
});
