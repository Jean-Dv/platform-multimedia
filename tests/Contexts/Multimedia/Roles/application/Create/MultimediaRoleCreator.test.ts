import { MultimediaRoleCreator } from '@Multimedia/Roles/application/Create/MultimediaRoleCreator'
import { MultimediaRoleRepositoryMock } from '../../__mocks__/MultimediaRoleRepositoryMock'
import { MultimediaRoleMother } from '../../domain/MultimediaRoleMother'

describe('MultimediaRoleCreator', () => {
  it('creates a new role', async () => {
    const role = MultimediaRoleMother.random()

    const repository = new MultimediaRoleRepositoryMock()
    const creator = new MultimediaRoleCreator(repository)

    await creator.run(role.id.value, role.name.value)
    repository.assertSaveHaveBeenCalledWith(role)
  })
})
