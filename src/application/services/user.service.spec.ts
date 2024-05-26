import { UserService } from './user.service'
import { UserRepositoryInMemory } from '../../infra/database/inMemory/userRepositoryMemory'
import { UserRoles } from '../entities/user.entity'



describe("#UserSerivce", () => {
  const inMemoryDb = new UserRepositoryInMemory()
  const service = new UserService(inMemoryDb)


  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("Should create and return presenter", async () => {
    const crypto = require("node:crypto")

    const mockUUID = "123-123-123-123-123"
    jest.spyOn(crypto, "randomUUID").mockReturnValue(mockUUID)

    const mockDate = new Date(2024, 4, 26)

    jest.setSystemTime(mockDate)

    const user = {
      username: "Test",
      email: "test@test.com",
      password: "1234",
      role: UserRoles.EMPLOYEE
    }
    const createdUser = await service.store(user)

    const expected = {
      id: mockUUID,
      email: "test@test.com",
      username: "Test",
      updatedAt: mockDate,
      createdAt: mockDate
    }

    expect(createdUser).toStrictEqual(expected)
  })

  it.only("Should return user when passe valid email", async () => {
    const crypto = require("node:crypto")

    const mockUUID = "123-123-123-123-123"
    jest.spyOn(crypto, "randomUUID").mockReturnValue(mockUUID)

    const mockDate = new Date(2024, 4, 26)

    jest.setSystemTime(mockDate)
    const user = {
      username: "Test",
      email: "testfindEmail@test.com",
      password: "1234",
      role: UserRoles.EMPLOYEE
    }
    await service.store(user)

    const findedUser = await service.findByEmail(user.email)


    const expected = {
      id: mockUUID,
      email: "testfindEmail@test.com",
      username: "Test",
      updatedAt: mockDate,
      createdAt: mockDate
    }
    expect(findedUser).toStrictEqual(expected)
  })
})
