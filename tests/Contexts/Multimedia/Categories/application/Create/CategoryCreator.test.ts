import { CategoryCreator } from '@Multimedia/Categories/application/Create/CategoryCreator'
import { CategoryRepositoryMock } from '../../__mocks__/CategoryRepositoryMock'
import { CategoryMother } from '../../domain/CategoryMother'

describe('CategoryCreator', () => {
  it('creates a new category', async () => {
    const category = CategoryMother.random()

    const repository = new CategoryRepositoryMock()
    const creator = new CategoryCreator(repository)

    await creator.run(category.id.value, category.name.value)
    repository.assertSaveHaveBeenCalledWith(category)
  })
})
