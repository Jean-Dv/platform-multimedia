import { SearchRoleByIdQueryHandler } from '@Auth/Roles/application/SearchById/SearchRoleByIdQueryHandler'
import { RoleRepositoryMock } from '../../__mocks__/RoleRepositoryMock'
import { RoleMother } from '../../domain/RoleMother'
import { RoleByIdSearcher } from '@Auth/Roles/application/SearchById/RoleByIdSearcher'
import { SearchRoleByIdQuery } from '@Auth/Roles/application/SearchById/SearchRoleByIdQuery'
import { SearchRoleByIdResponseMother } from './SearchRoleByIdResponseMother'
import { RoleIdMother } from '../../domain/RoleIdMother'
import { RoleNotFound } from '@Auth/Roles/domain/RoleNotFound'

describe('SearchRoleByIdQueryHandler', () => {
  let repository: RoleRepositoryMock

  beforeEach(() => {
    repository = new RoleRepositoryMock()
  })

  it('should find role by id', async () => {
    const roles = [RoleMother.random(), RoleMother.random()]
    repository.searchMockReturnValue(roles[0])

    const handler = new SearchRoleByIdQueryHandler(
      new RoleByIdSearcher(repository)
    )
    const query = new SearchRoleByIdQuery(roles[0].id.value)
    const response = await handler.handle(query)
    const expected = SearchRoleByIdResponseMother.create(roles[0])
    repository.assertSearchByIdHaveBeenCalledWith(roles[0].id)
    expect(expected).toEqual(response)
  })

  it('should not find role by id', async () => {
    try {
      const roles = [RoleMother.random(), RoleMother.random()]
      repository.searchMockReturnValue(roles[0])

      const handler = new SearchRoleByIdQueryHandler(
        new RoleByIdSearcher(repository)
      )
      const idForTest = RoleIdMother.random()
      const query = new SearchRoleByIdQuery(idForTest.value)
      await handler.handle(query)
      repository.assertSearchByIdHaveBeenCalledWith(roles[0].id)
    } catch (error) {
      expect(error).toBeInstanceOf(RoleNotFound)
    }
  })
})
