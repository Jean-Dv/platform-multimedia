import { SearchUserByEmailQueryHandler } from '@Auth/User/application/SearchByEmail/SearchUserByEmailQueryHandler'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserByEmailSearcher } from '@Auth/User/application/SearchByEmail/UserByEmailSearcher'
import { SearchUserByEmailQuery } from '@Auth/User/application/SearchByEmail/SearchUserByEmailQuery'
import { SearchUserByEmailResponseMother } from './SearchUserByEmailResponseMother'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'

describe('SearchUserByEmailQueryHandler', () => {
  let repository: UserRepositoryMock

  beforeEach(() => {
    repository = new UserRepositoryMock()
  })

  it('should find user by email', async () => {
    const users = [
      UserMother.random(),
      UserMother.random(),
      UserMother.random()
    ]
    repository.searchMockReturnValue(users[0])

    const handler = new SearchUserByEmailQueryHandler(
      new UserByEmailSearcher(repository)
    )

    const query = new SearchUserByEmailQuery(users[0].email.value)
    const response = await handler.handle(query)
    const expected = SearchUserByEmailResponseMother.create(users[0])
    repository.assertSearchByEmailHaveBeenCalledWith(users[0].email)
    expect(expected).toEqual(response)
  })

  it('should not find user by email', async () => {
    try {
      const users = [
        UserMother.random(),
        UserMother.random(),
        UserMother.random()
      ]
      repository.searchMockReturnValue(users[0])

      const handler = new SearchUserByEmailQueryHandler(
        new UserByEmailSearcher(repository)
      )

      const query = new SearchUserByEmailQuery('jhondoe@gmail.com')
      await handler.handle(query)
      repository.assertSearchByEmailHaveBeenCalledWith(users[0].email)
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFound)
    }
  })
})
