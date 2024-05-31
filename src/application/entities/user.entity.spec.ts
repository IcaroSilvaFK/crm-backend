import { UserEntity, UserRoles } from './user.entity';

describe('#UserEntity', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should make hash user password', async () => {
    const user = new UserEntity(
      'test@test.com',
      '1234',
      'test',
      UserRoles.ADMIN,
    );

    const notExpectedPassword = '1234';

    await user.ensurePassword();

    expect(user.password).not.toBe(notExpectedPassword);
  });

  it('Should return throw when not provide email', () => {
    const user = new UserEntity('', '1234', 'test', UserRoles.ADMIN);

    expect(() => user.validate()).toThrow();
  });

  it('Should return throw when not provide password', () => {
    const user = new UserEntity('test@test.com', '', 'test', UserRoles.ADMIN);

    expect(() => user.validate()).toThrow();
  });

  it('Should return throw when not provide username', () => {
    const user = new UserEntity('test@test.com', '1234', '', UserRoles.ADMIN);

    expect(() => user.validate()).toThrow();
  });
});
