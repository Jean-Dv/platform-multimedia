import { SearchUserByIdQueryHandler } from '@Auth/User/application/SearchById/SearchUserByIdQueryHandler'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserByIdSearcher } from '@Auth/User/application/SearchById/UserByIdSearcher'
import { SearchUserByIdQuery } from '@Auth/User/application/SearchById/SearchUserByIdQuery'
import { SearchUserByIdResponseMother } from './SearchUserByIdResponseMother'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'
import { UuidMother } from '../../../../Shared/domain/UuidMother'

describe('SearchUserByIdQueryHandler', () => {
  let repository: UserRepositoryMock

  beforeEach(() => {
    repository = new UserRepositoryMock()
  })

  it('should find user by id', async () => {
    const users = [
      UserMother.random(),
      UserMother.random(),
      UserMother.random()
    ]
    repository.searchMockReturnValue(users[0])

    const handler = new SearchUserByIdQueryHandler(
      new UserByIdSearcher(repository)
    )

    const query = new SearchUserByIdQuery(users[0].id.value)
    const response = await handler.handle(query)
    const expected = SearchUserByIdResponseMother.create(users[0])
    repository.assertSearchByIdHaveBeenCalledWith(users[0].id)
    expect(expected).toEqual(response)
  })

  it('should not find user by id', async () => {
    try {
      const users = [
        UserMother.random(),
        UserMother.random(),
        UserMother.random()
      ]
      repository.searchMockReturnValue(users[0])

      const handler = new SearchUserByIdQueryHandler(
        new UserByIdSearcher(repository)
      )

      const query = new SearchUserByIdQuery(UuidMother.random())
      await handler.handle(query)
      repository.assertSearchByIdHaveBeenCalledWith(users[0].id)
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFound)
    }
  })
})
