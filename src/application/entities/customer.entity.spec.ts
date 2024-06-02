import { UuidUtils } from '../../infra/utils/uuidUtils';
import { AddressEntity } from './address.entity';
import { CustomerEntity } from './customer.entity';

describe('#CustomerEntity', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should create a new CustomerEntity and set Address', () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const customer = new CustomerEntity('Test', 62998358542);

    customer.setAddress = new AddressEntity(
      353,
      'street',
      'test',
      'Near Test Square',
    );

    const expectedCustomer = {
      id: mockId,
      username: 'Test',
      phoneNumber: 62998358542,
      address: {
        number: 353,
        street: 'street',
        neighborhood: 'test',
        complement: 'Near Test Square',
        id: mockId,
      },
    };

    expect(customer).toEqual(expectedCustomer);
  });
});
