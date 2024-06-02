import { UuidUtils } from '../../infra/utils/uuidUtils';
import { CustomerEntity } from './customer.entity';
import { ServiceEntity } from './service.entity';

describe('#ServiceEntity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new service entity without customer', () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const service = new ServiceEntity('123', 'test', 2500);

    const expected = {
      customerId: '123',
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: undefined,
      id: mockId,
    };

    expect(service).toEqual(expected);
  });

  it('Should create a new service entity and set Start date', () => {
    const mockId = '123-123-123-123-123';
    const mockDate = new Date();

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const service = new ServiceEntity('123', 'test', 2500);

    service.setStartDate = mockDate;

    const expected = {
      customerId: '123',
      details: 'test',
      value: 2500,
      startDate: mockDate,
      endDate: undefined,
      id: mockId,
    };

    expect(service).toEqual(expected);
  });

  it('Should create a new service entity and set End Date', () => {
    const mockId = '123-123-123-123-123';
    const endAt = new Date();

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const service = new ServiceEntity('123', 'test', 2500);
    service.setEndDate = endAt;

    const expected = {
      customerId: '123',
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: endAt,
      id: mockId,
    };

    expect(service).toEqual(expected);
  });

  it('Should create a new service and add customer', () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const service = new ServiceEntity('123', 'test', 2500);
    const customer = new CustomerEntity('Test', 62998358542);

    service.setCustomer = customer;

    const expected = {
      customerId: '123',
      details: 'test',
      value: 2500,
      startDate: undefined,
      endDate: undefined,
      id: mockId,
      customer: {
        username: 'Test',
        phoneNumber: 62998358542,
        address: undefined,
        id: '123-123-123-123-123',
      },
    };

    expect(service).toEqual(expected);
  });
});
