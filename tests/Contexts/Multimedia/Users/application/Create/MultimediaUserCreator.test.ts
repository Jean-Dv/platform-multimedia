import { MultimediaUserCreator } from '@Multimedia/Users/application/Create/MultimediaUserCreator'
import { MultimediaUserRepositoryMock } from '../../__mocks__/MultimediaUserRepositoryMock'
import { MultimediaUserMother } from '../../domain/MultimediaUserMother'

describe('MultimediaUserCreator', () => {
  it('creates a new user', async () => {
    const user = MultimediaUserMother.random()

    const repository = new MultimediaUserRepositoryMock()
    const creator = new MultimediaUserCreator(repository)

    await creator.run(user.id.value)
    repository.assertSaveHaveBeenCalledWith(user)
  })
})
