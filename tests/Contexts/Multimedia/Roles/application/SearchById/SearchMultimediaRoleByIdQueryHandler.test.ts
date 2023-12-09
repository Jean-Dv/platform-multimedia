import { SearchMultimediaRoleByIdQueryHandler } from '@Multimedia/Roles/application/SearchById/SearchMultimediaRoleByIdQueryHandler'
import { MultimediaRoleRepositoryMock } from '../../__mocks__/MultimediaRoleRepositoryMock'
import { MultimediaRoleMother } from '../../domain/MultimediaRoleMother'
import { MultimediaRoleByIdSearcher } from '@Multimedia/Roles/application/SearchById/MultimediaRoleByIdSearcher'
import { SearchMultimediaRoleByIdQuery } from '@Multimedia/Roles/application/SearchById/SearchMultimediaRoleByIdQuery'
import { SearchMultimediaRoleByIdResponseMother } from './SearchMultimediaRoleByIdResponseMother'
import { MultimediaRoleNotFound } from '@Multimedia/Roles/domain/MultimediaRoleNotFound'
import { MultimediaRoleIdMother } from '../../domain/MultimediaRoleIdMother'

describe('SearchMultimediaRoleByIdQueryHandler', () => {
  let repository: MultimediaRoleRepositoryMock

  beforeEach(() => {
    repository = new MultimediaRoleRepositoryMock()
  })

  it('should find multimedia role by id', async () => {
    const multimediaRoles = [
      MultimediaRoleMother.random(),
      MultimediaRoleMother.random()
    ]
    repository.searchMockReturnValue(multimediaRoles[0])

    const handler = new SearchMultimediaRoleByIdQueryHandler(
      new MultimediaRoleByIdSearcher(repository)
    )
    const query = new SearchMultimediaRoleByIdQuery(multimediaRoles[0].id.value)
    const response = await handler.handle(query)
    const expected = SearchMultimediaRoleByIdResponseMother.create(
      multimediaRoles[0]
    )
    repository.assertSearchHaveBeenCalledWith(multimediaRoles[0].id)
    expect(expected).toEqual(response)
  })

  it('should not find multimedia role by id', async () => {
    try {
      const multimediaRoles = [
        MultimediaRoleMother.random(),
        MultimediaRoleMother.random()
      ]
      repository.searchMockReturnValue(multimediaRoles[0])

      const handler = new SearchMultimediaRoleByIdQueryHandler(
        new MultimediaRoleByIdSearcher(repository)
      )
      const idForTest = MultimediaRoleIdMother.random()
      const query = new SearchMultimediaRoleByIdQuery(idForTest.value)
      await handler.handle(query)
      repository.assertSearchHaveBeenCalledWith(multimediaRoles[0].id)
    } catch (error) {
      expect(error).toBeInstanceOf(MultimediaRoleNotFound)
    }
  })
})
