import { SeasonCreator } from '@Multimedia/Season/application/Create/SeasonCreator'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import { SeasonMother } from '../../domain/SeasonMother'

describe('SeasonCreator', () => {
  it('creates a new season', async () => {
    const season = SeasonMother.random()

    const repository = new SeasonRepositoryMock()
    const creator = new SeasonCreator(repository)

    await creator.run(
      season.id.value,
      season.serieId.value,
      season.title.value,
      season.releaseYear.value
    )
    repository.assertSaveHaveBeenCalledWith(season)
  })
})
