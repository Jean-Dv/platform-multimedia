import { UserAuthenticator } from '@Auth/UserAuth/application/authenticate/UserAuthenticator'
import { AuthRepositoryMock } from '../../__mocks__/AuthRepositoryMock'
import { AuthenticateUserCommandHandler } from '@Auth/UserAuth/application/authenticate/AuthenticateUserCommandHandler'
import { AuthenticateUserCommandMother } from './AuthenticateUserCommandMother'
import { AuthUserMother } from '../../domain/AuthUserMother'
import { InvalidAuthEmail } from '@Auth/UserAuth/domain/InvalidAuthEmail'
import { AuthUserPasswordMother } from '../../domain/AuthUserPasswordMother'
import { InvalidAuthCredentials } from '@Auth/UserAuth/domain/InvalidAuthCredentials'

let repository: AuthRepositoryMock
let authenticator: UserAuthenticator
let handler: AuthenticateUserCommandHandler

beforeEach(() => {
  repository = new AuthRepositoryMock()
  authenticator = new UserAuthenticator(repository)
  handler = new AuthenticateUserCommandHandler(authenticator)
})

describe('AuthenticateUserCommandHandler', () => {
  it('should authenticate a valid user', async () => {
    const user = AuthUserMother.random()
    repository.searchMockReturnValue(user)
    const command = AuthenticateUserCommandMother.create(
      user.email,
      user.password
    )
    await handler.handle(command)
    repository.assertSearchHaveBeenCalledWith(user.email)
  })

  it('should throw an error when user does not exist', async () => {
    const user = AuthUserMother.random()
    try {
      const command = AuthenticateUserCommandMother.create(
        user.email,
        user.password
      )
      await handler.handle(command)
      repository.assertSearchHaveBeenCalledWith(user.email)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidAuthEmail)
    }
  })

  it('should throw an error when password is invalid', async () => {
    const user = AuthUserMother.random()
    repository.searchMockReturnValue(user)
    try {
      const command = AuthenticateUserCommandMother.create(
        user.email,
        AuthUserPasswordMother.random()
      )
      await handler.handle(command)
      repository.assertSearchHaveBeenCalledWith(user.email)
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidAuthCredentials)
    }
  })
})
