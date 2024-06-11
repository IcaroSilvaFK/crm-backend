import { UuidUtils } from '../../infra/utils/uuidUtils';
import { InMemoryAddressRepository } from '../../infra/database/inMemory/addressRepositoryMemory';
import { InMemoryCustomerRepository } from '../../infra/database/inMemory/customerRepositoryMemory';

import { AddressService } from './address.service';
import { CustomerService } from './customer.service';
import { CustomerEntity } from '../entities/customer.entity';
import { AddressEntity } from '../entities/address.entity';

describe('#AddressService', () => {
  let addressService: AddressService;
  let customerService: CustomerService;
  let addressRepository: InMemoryAddressRepository;
  let inMemoryAddressRepository: InMemoryCustomerRepository;

  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository();
    inMemoryAddressRepository = new InMemoryCustomerRepository();
    customerService = new CustomerService(
      inMemoryAddressRepository,
      addressRepository,
    );
    addressService = new AddressService(addressRepository, customerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new address with customer', async () => {
    const mockId = '123-123-123-123-123';

    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockId);

    const customer = new CustomerEntity('Test', '62998358542');

    await customerService.store(customer);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );

    await addressService.store(customer.id, address);

    const result = await addressRepository.findById(customer.id);

    const expected = {
      id: mockId,
      number: 123,
      street: 'Street',
      neighborhood: 'Neighborhood',
      complement: 'Complement',
    };

    expect(result).toEqual(expected);
  });

  it('Should update fields from address', async () => {
    const updateMockFn = jest.fn();
    jest.spyOn(addressRepository, 'update').mockImplementation(updateMockFn);

    const address = new AddressEntity(
      123,
      'Street',
      'Neighborhood',
      'Complement',
    );
    await addressService.update('123', address);

    expect(updateMockFn).toHaveBeenCalled();
    expect(updateMockFn).toHaveBeenCalledWith('123', address);
  });

  it('Should destroy address when pass valid address and user exists', async () => {
    const destroyMockFn = jest.fn();
    jest.spyOn(addressRepository, 'destroy').mockImplementation(destroyMockFn);

    await addressService.destroy('123');

    expect(destroyMockFn).toHaveBeenCalled();
    expect(destroyMockFn).toHaveBeenCalledWith('123');
  });
});
