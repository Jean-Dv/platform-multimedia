import { type User } from '@Auth/User/domain/User'
import { type UserRepository } from '@Auth/User/domain/UserRepository'

export class UserRepositoryMock implements UserRepository {
  private readonly saveMock: jest.Mock
  private readonly users: User[] = []

  constructor() {
    this.saveMock = jest.fn()
  }

  public async save(user: User): Promise<void> {
    this.saveMock(user)
  }

  public assertSaveHaveBeenCalledWith(user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }

  public searchMockReturnValue(user: User): void {
    this.users.push(user)
  }
}
