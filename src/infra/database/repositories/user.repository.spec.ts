/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
import {
  UserEntity,
  UserRoles,
} from '../../../application/entities/user.entity';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('#UserRepository', () => {
  const prisma = jestPrisma.client as PrismaClient;
  let userRepo: UserRepository;

  beforeEach(() => {
    userRepo = new UserRepository(prisma as unknown as PrismaService);

    jest.restoreAllMocks();
  });

  it('#store', async () => {
    const crypto = require('node:crypto');

    const mockId = '123-123-123-123-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockId);

    const user = new UserEntity(
      'test@test.com',
      '1234',
      'test',
      UserRoles.USER,
    );

    const result = await userRepo.store(user);
    const expectedId = mockId;

    expect(result.id).toBe(expectedId);
    expect(result.email).toBe('test@test.com');
    expect(result.password).toBe('1234');
    expect(user.username).toBe('test');
    expect(user.role).toBe(UserRoles.USER);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('#findByEmail', async () => {
    const email = 'developer@developer.com';
    const crypto = require('node:crypto');

    const mockId = '123-123-123-123-123';
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockId);

    const user = new UserEntity(email, '123', 'test', UserRoles.USER);

    await userRepo.store(user);

    const findedUser = await userRepo.findByEmail(email);
    const expectedEmail = email;
    const expectedId = mockId;

    expect(findedUser.email).toBe(expectedEmail);
    expect(findedUser.id).toBe(expectedId);
    expect(findedUser.password).toBe('123');
    expect(findedUser.username).toBe('test');
    expect(findedUser.role).toBe(UserRoles.USER);
    expect(findedUser.createdAt).toBeDefined();
    expect(findedUser.updatedAt).toBeDefined();
  });

  it('#findByEmail should expect exception when email not exists', async () => {
    await expect(async () => await userRepo.findByEmail('')).rejects.toThrow();
  });

  it('#findById', async () => {
    const user = new UserEntity(
      'test@test.com',
      '1234',
      'test',
      UserRoles.ADMIN,
    );

    await userRepo.store(user);

    const findedUser = await userRepo.findById(user.id);

    expect(findedUser.id).toBe(user.id);
  });

  it('#findById expect exception when user not found', async () => {
    await expect(async () => await userRepo.findById('')).rejects.toThrow();
  });

  it('#update', async () => {
    const baseUser = new UserEntity(
      'teste@test.com',
      '123',
      'test',
      UserRoles.ADMIN,
    );

    await userRepo.store(baseUser);

    const updatedUser = {
      username: 'test2',
      password: 'test',
      email: 'newEmail@email.com',
    };

    await userRepo.update(baseUser.id, updatedUser);

    const user = await userRepo.findById(baseUser.id);

    const expectedUpdatedProperties = updatedUser;

    expect(user.email).toBe(expectedUpdatedProperties.email);
    expect(user.username).toBe(expectedUpdatedProperties.username);
    expect(user.password).toBe(expectedUpdatedProperties.password);
  });

  it('#destroy', async () => {
    const user = new UserEntity(
      'teste@test.com',
      '123',
      'test',
      UserRoles.ADMIN,
    );

    await userRepo.store(user);

    await userRepo.destroy(user.id);

    await expect(
      async () => await userRepo.findById(user.id),
    ).rejects.toThrow();
  });
});
