import { SeasonDeletor } from '@Multimedia/Season/application/Delete/SeasonDeletor'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import { SeasonMother } from '../../domain/SeasonMother'

describe('SeasonDeletor', () => {
  it('deletes a season', async () => {
    const season = SeasonMother.random()

    const repository = new SeasonRepositoryMock()
    const deletor = new SeasonDeletor(repository)

    await deletor.run(season.id.value)
    repository.assertDeleteHaveBeenCalledWith(season.id)
  })
})
