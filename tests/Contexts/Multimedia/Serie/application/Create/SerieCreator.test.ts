import { SerieCreator } from '@Multimedia/Serie/application/Create/SerieCreator'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import { SerieMother } from '../../domain/SerieMother'

describe('SerieCreator', () => {
  it('creates a new serie', async () => {
    const serie = SerieMother.random()

    const repository = new SerieRepositoryMock()
    const creator = new SerieCreator(repository)

    await creator.run(
      serie.id.value,
      serie.title.value,
      serie.releaseYear.value,
      serie.synopsis.value,
      serie.categories.map((category) => category.value)
    )
    repository.assertSaveHaveBeenCalledWith(serie)
  })
})
