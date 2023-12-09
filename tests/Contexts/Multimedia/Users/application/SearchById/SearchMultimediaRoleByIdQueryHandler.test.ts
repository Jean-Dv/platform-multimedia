import { SearchMultimediaUserByIdQueryHandler } from '@Multimedia/Users/application/SearchById/SearchMultimediaUserByIdQueryHandler'
import { MultimediaUserRepositoryMock } from '../../__mocks__/MultimediaUserRepositoryMock'
import { MultimediaUserMother } from '../../domain/MultimediaUserMother'
import { MultimediaUserByIdSearcher } from '@Multimedia/Users/application/SearchById/MultimediaUserByIdSearcher'
import { SearchMultimediaUserByIdQuery } from '@Multimedia/Users/application/SearchById/SearchMultimediaUserByIdQuery'
import { SearchMultimediaUserByIdResponseMother } from './SearchMultimediaUserByIdResponseMother'
import { MultimediaUserNotFound } from '@Multimedia/Users/domain/MultimediaUserNotFound'
import { MultimediaUserIdMother } from '../../domain/MultimediaUserIdMother'

describe('SearchMultimediaRoleByIdQueryHandler', () => {
  let repository: MultimediaUserRepositoryMock

  beforeEach(() => {
    repository = new MultimediaUserRepositoryMock()
  })

  it('should find multimedia role by id', async () => {
    const multimediaUsers = [
      MultimediaUserMother.random(),
      MultimediaUserMother.random()
    ]
    repository.searchMockReturnValue(multimediaUsers[0])

    const handler = new SearchMultimediaUserByIdQueryHandler(
      new MultimediaUserByIdSearcher(repository)
    )
    const query = new SearchMultimediaUserByIdQuery(multimediaUsers[0].id.value)
    const response = await handler.handle(query)
    const expected = SearchMultimediaUserByIdResponseMother.create(
      multimediaUsers[0]
    )
    repository.assertSearchHaveBeenCalledWith(multimediaUsers[0].id)
    expect(expected).toEqual(response)
  })

  it('should not find multimedia role by id', async () => {
    try {
      const multimediaUsers = [
        MultimediaUserMother.random(),
        MultimediaUserMother.random()
      ]
      repository.searchMockReturnValue(multimediaUsers[0])

      const handler = new SearchMultimediaUserByIdQueryHandler(
        new MultimediaUserByIdSearcher(repository)
      )
      const idForTest = MultimediaUserIdMother.random()
      const query = new SearchMultimediaUserByIdQuery(idForTest.value)
      await handler.handle(query)
      repository.assertSearchHaveBeenCalledWith(multimediaUsers[0].id)
    } catch (error) {
      expect(error).toBeInstanceOf(MultimediaUserNotFound)
    }
  })
})
