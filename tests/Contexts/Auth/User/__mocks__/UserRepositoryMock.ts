import { type User } from '@Auth/User/domain/User'
import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { type Nullable } from '@Shared/domain/Nullable'
import { type UserEmail } from '@Auth/User/domain/UserEmail'

export class UserRepositoryMock implements UserRepository {
  private readonly saveMock: jest.Mock
  private readonly searchByEmailMock: jest.Mock
  private readonly users: User[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchByEmailMock = jest.fn()
  }

  public async save(user: User): Promise<void> {
    this.saveMock(user)
  }

  public async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    this.searchByEmailMock(email)
    const user = this.users.find((user) => user.email.value === email.value)
    return user
  }

  public assertSaveHaveBeenCalledWith(user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }

  public assertSearchByEmailHaveBeenCalledWith(email: UserEmail): void {
    expect(this.searchByEmailMock).toHaveBeenCalledWith(email)
  }

  public searchMockReturnValue(user: User): void {
    this.users.push(user)
  }
}
