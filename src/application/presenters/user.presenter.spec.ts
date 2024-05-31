import { UserEntity, UserRoles } from '../entities/user.entity';
import { UserPresenter } from './user.presenter';

describe('#UserPresneter', () => {
  it('Should return valid json when passed valid user', () => {
    const now = new Date();
    const user = new UserEntity(
      'test@test.com',
      '1223',
      'test',
      UserRoles.ADMIN,
      '123',
      now,
      now,
    );

    const result = new UserPresenter(user);

    const expected = {
      email: 'test@test.com',
      username: 'test',
      updatedAt: now,
      createdAt: now,
      id: '123',
    };

    expect(result.toJson()).toStrictEqual(expected);
  });

  it('Should return valid properties in array when toJsonArray', () => {
    const now = new Date();

    const users = [
      new UserEntity(
        'test1@gmail.com',
        '1234',
        'test',
        UserRoles.ADMIN,
        '1',
        now,
        now,
      ),
      new UserEntity(
        'test2@test.com',
        '1234',
        'test2',
        UserRoles.USER,
        '12',
        now,
        now,
      ),
    ];

    const result = new UserPresenter(users);

    const expected = [
      {
        email: 'test1@gmail.com',
        username: 'test',
        updatedAt: now,
        createdAt: now,
        id: '1',
      },
      {
        email: 'test2@test.com',
        username: 'test2',
        updatedAt: now,
        createdAt: now,
        id: '12',
      },
    ];

    expect(result.toJson()).toStrictEqual(expected);
  });
});
