import { SerieUpdaterCategory } from '@Multimedia/Serie/application/UpdateCategory/SerieUpdaterCategory'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import { SerieMother } from '../../domain/SerieMother'

describe('SerieUpdaterCategory', () => {
  it('updates series by category', async () => {
    const serie = SerieMother.random()
    const repository = new SerieRepositoryMock()
    const updater = new SerieUpdaterCategory(repository)

    const name = serie.category
    await updater.run(name.value)
    repository.assertUpdateSeriesByCategoryHaveBeenCalledWith(name)
  })
})
