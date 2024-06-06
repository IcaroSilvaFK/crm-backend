import { CustomerEntity } from '../entities/customer.entity';
import { CustomerPresenter } from './customer.presenter';
import { UuidUtils } from '../../infra/utils/uuidUtils';

describe('#CustomerPresenter Test Suite', () => {
  it('Should return customer valid object json', () => {
    const mockId = '123-123-123-123-123';
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const customer = new CustomerEntity('test', '99999999');

    const result = new CustomerPresenter(customer);

    const expected = {
      id: mockId,
      username: 'test',
      createdAt: undefined,
      updatedAt: undefined,
      phoneNumber: '99999999',
    };

    expect(result.toJson()).toStrictEqual(expected);
  });

  it('Should return customer valid array json', () => {
    const mockId = '123-123-123-123-123';
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const customer = new CustomerEntity('test', '99999999');

    const result = new CustomerPresenter([customer]);

    const expected = [
      {
        id: mockId,
        username: 'test',
        createdAt: undefined,
        updatedAt: undefined,
        phoneNumber: '99999999',
      },
    ];

    expect(result.toJson()).toStrictEqual(expected);
  });
});
