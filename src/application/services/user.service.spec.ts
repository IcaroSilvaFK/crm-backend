/* eslint-disable @typescript-eslint/no-var-requires */
import { UserService } from './user.service';
import { UserRepositoryInMemory } from '../../infra/database/inMemory/userRepositoryMemory';
import { UserEntity, UserRoles } from '../entities/user.entity';

describe('#UserSerivce', () => {
  const inMemoryDb = new UserRepositoryInMemory();
  const service = new UserService(inMemoryDb);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Should create and return presenter', async () => {
    const crypto = require('node:crypto');

    const mockUUID = '123-123-123-123-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

    const mockDate = new Date(2024, 4, 26);

    jest.setSystemTime(mockDate);

    const user = {
      username: 'Test',
      email: 'test@test.com',
      password: '1234',
      role: UserRoles.EMPLOYEE,
    };
    const createdUser = await service.store(user);

    const expected = {
      id: mockUUID,
      email: 'test@test.com',
      username: 'Test',
      updatedAt: mockDate,
      createdAt: mockDate,
    };

    expect(createdUser.toJson()).toStrictEqual(expected);
  });

  it('Should return user when pass valid email', async () => {
    const crypto = require('node:crypto');

    const mockUUID = '123-123-123-123-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

    const mockDate = new Date(2024, 4, 26);

    jest.setSystemTime(mockDate);
    const user = {
      username: 'Test',
      email: 'testfindEmail@test.com',
      password: '1234',
      role: UserRoles.EMPLOYEE,
    };
    await service.store(user);

    const findedUser = await service.findByEmail(user.email);

    const expected = {
      id: mockUUID,
      email: 'testfindEmail@test.com',
      username: 'Test',
      updatedAt: mockDate,
      createdAt: mockDate,
    };
    expect(findedUser.toJson()).toStrictEqual(expected);
  });

  it('Should return user when pass valid id', async () => {
    const user = {
      username: 'Test id',
      email: 'testfindId@email.com',
      password: '1234',
      role: UserRoles.EMPLOYEE,
    };
    const createdUser = await service.store(user);
    const userId = (createdUser.toJson() as UserEntity).id;
    const findedUser = await service.findById(userId);

    expect(findedUser).toStrictEqual(createdUser);
  });

  it('Should update fields from user when pass valid user', async () => {
    const user = new UserEntity(
      'test@test.com',
      '1234',
      'username',
      UserRoles.USER,
    );

    await service.store(user);

    await service.update(user.id, {});
  });

  it.todo('Should delete user when pass valid id');
});
