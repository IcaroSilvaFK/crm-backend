import { UserRepositoryInMemory } from '../../../../infra/database/inMemory/userRepositoryMemory';
import { UserService } from '../../../services/user.service';
import { UsersController } from './user.controller';
import { UserRoles } from '../../../entities/user.entity';
import { HashUtils } from '../../../../infra/utils/hashUtil';
import { UuidUtils } from '../../../../infra/utils/uuidUtils';

describe('#UsersController', () => {
  let userService: UserService;
  let userController: UsersController;

  beforeEach(() => {
    jest.useFakeTimers();
    userService = new UserService(new UserRepositoryInMemory());
    userController = new UsersController(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create a new user when passed valid params', async () => {
    const mockUUID = '123-123-123-123-123';
    jest.spyOn(HashUtils, 'makeHash').mockResolvedValue('123456');
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockUUID);

    const now = new Date();

    jest.setSystemTime(now);

    const result = await userController.createNewUser({
      email: 'test@test.com',
      password: '1234',
      role: UserRoles.USER,
      username: 'test',
    });
    const expectedId = mockUUID;
    const expected = {
      username: 'test',
      email: 'test@test.com',
      createdAt: now,
      updatedAt: now,
      id: expectedId,
    };

    expect(result).toStrictEqual(expected);
  });

  it('Should find user by id when exists user', async () => {
    const createdUser = await userController.createNewUser({
      email: 'test@test.com',
      password: '1234',
      role: UserRoles.USER,
      username: 'test',
    });

    const result = await userController.findById(createdUser.id);

    expect(result).toStrictEqual(createdUser);
  });

  it('Should ive exception when user not found', async () => {
    await expect(async () => userController.findById('as')).rejects.toThrow();
  });

  it('Should update user when user exists', async () => {
    const mockUUID = '123-123-123-123-123';
    jest.spyOn(HashUtils, 'makeHash').mockResolvedValue('123456');
    jest.spyOn(UuidUtils, 'generateUUID').mockReturnValue(mockUUID);

    const now = new Date();

    jest.setSystemTime(now);

    const createdUser = await userController.createNewUser({
      email: 'test@test.com',
      password: '1234',
      role: UserRoles.USER,
      username: 'test',
    });

    await userController.update(createdUser.id, {
      username: 'testupdate',
      role: UserRoles.ADMIN,
    });

    const result = await userController.findById(createdUser.id);

    const expected = {
      username: 'testupdate',
      email: 'test@test.com',
      createdAt: now,
      updatedAt: now,
      id: mockUUID,
    };

    expect(result).toEqual(expected);
  });

  it('Should throw exception whe user not exists', async () => {
    await expect(
      async () =>
        await userController.update('abc', {
          email: 'cascascas',
        }),
    ).rejects.toThrow();
  });

  it('Should destroy user when exists', async () => {
    const createdUser = await userController.createNewUser({
      email: 'test@test.com',
      password: '1234',
      role: UserRoles.USER,
      username: 'test',
    });

    await userController.delete(createdUser.id);

    await expect(
      async () => await userController.findById(createdUser.id),
    ).rejects.toThrow();
  });

  it("Should throw error when trying to delete a user that doesn't exist", async () => {
    await expect(async () =>
      userController.delete('dcacacas'),
    ).rejects.toThrow();
  });
});
