import { UserEntity, UserRoles } from '../entities/user.entity'
import { UserPresenter } from './user.presenter'


describe("#UserPresneter", () => {

  it("Should return valid json when passed valid user", () => {
    const now = new Date()
    const user = new UserEntity("test@test.com", "1223", "test", UserRoles.ADMIN, "123", now, now)

    const result = UserPresenter.toJson(user)

    const expected = {
      email: "test@test.com",
      username: "test",
      updatedAt: now,
      createdAt: now,
      id: "123"
    }

    expect(result).toStrictEqual(expected)
  })
})
