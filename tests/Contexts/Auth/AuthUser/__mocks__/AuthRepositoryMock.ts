import { type AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { type AuthRepository } from '@Auth/UserAuth/domain/AuthRepository'
import { type AuthUser } from '@Auth/UserAuth/domain/AuthUser'
import { type Nullable } from '@Shared/domain/Nullable'
import { AuthUserMother } from '../domain/AuthUserMother'
import { AuthUserPasswordMother } from '../domain/AuthUserPasswordMother'

export class AuthRepositoryMock implements AuthRepository {
  private readonly searchMock: jest.Mock
  private readonly users: AuthUser[] = []

  constructor() {
    this.searchMock = jest.fn()
  }

  public async search(email: AuthEmail): Promise<Nullable<AuthUser>> {
    this.searchMock(email)
    return this.users.find((user) => user.email.value === email.value)
  }

  public assertSearchHaveBeenCalledWith(email: AuthEmail): void {
    expect(this.searchMock).toHaveBeenCalledWith(email)
  }

  public searchMockReturnValue(auth: AuthUser): void {
    const responseFromDb = AuthUserMother.create(
      auth.email,
      AuthUserPasswordMother.hashed(auth.password.value)
    )
    this.users.push(responseFromDb)
  }
}
