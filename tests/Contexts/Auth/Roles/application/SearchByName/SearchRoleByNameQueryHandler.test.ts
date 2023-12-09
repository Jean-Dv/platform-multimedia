import { SearchRoleByNameQueryHandler } from '@Auth/Roles/application/SearchByName/SearchRoleByNameQueryHandler'
import { RoleRepositoryMock } from '../../__mocks__/RoleRepositoryMock'
import { RoleMother } from '../../domain/RoleMother'
import { RoleByNameSearcher } from '@Auth/Roles/application/SearchByName/RoleByNameSearcher'
import { SearchRoleByNameQuery } from '@Auth/Roles/application/SearchByName/SearchRoleByNameQuery'
import { RoleIdMother } from '../../domain/RoleIdMother'
import { RoleNameMother } from '../../domain/RoleNameMother'
import { SearchRoleByNameResponseMother } from './SearchRoleByNameResponseMother'
import { RoleNotFound } from '@Auth/Roles/domain/RoleNotFound'

describe('SearchRoleByNameQueryHandler', () => {
  let repository: RoleRepositoryMock

  beforeEach(() => {
    repository = new RoleRepositoryMock()
  })

  it('should find role by name', async () => {
    const roles = [
      RoleMother.create(RoleIdMother.random(), RoleNameMother.create('admin')),
      RoleMother.create(
        RoleIdMother.random(),
        RoleNameMother.create('registered')
      )
    ]
    repository.searchMockReturnValue(roles[0])

    const handler = new SearchRoleByNameQueryHandler(
      new RoleByNameSearcher(repository)
    )
    const query = new SearchRoleByNameQuery(roles[0].name.value)
    const response = await handler.handle(query)
    const expected = SearchRoleByNameResponseMother.create(roles[0])
    repository.assertSearchHaveBeenCalledWith(roles[0].name)
    expect(expected).toEqual(response)
  })

  it('should not find role by name', async () => {
    try {
      const roles = [
        RoleMother.create(
          RoleIdMother.random(),
          RoleNameMother.create('registered')
        )
      ]
      repository.searchMockReturnValue(roles[0])

      const handler = new SearchRoleByNameQueryHandler(
        new RoleByNameSearcher(repository)
      )
      const query = new SearchRoleByNameQuery('registered')
      await handler.handle(query)
      repository.assertSearchHaveBeenCalledWith(roles[0].name)
    } catch (error) {
      expect(error).toBeInstanceOf(RoleNotFound)
    }
  })
})
