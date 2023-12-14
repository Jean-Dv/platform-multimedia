import { SeasonDeletor } from '@Multimedia/Season/application/Delete/SeasonDeletor'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import { SeasonMother } from '../../domain/SeasonMother'

describe('SeasonDeleter', () => {
  it('deletes seasons by id', async () => {
    const season = SeasonMother.random()
    const repository = new SeasonRepositoryMock()
    const deletor = new SeasonDeletor(repository)

    const serieId = season.serieId
    await deletor.run(serieId.value)
    repository.assertDeleteBySerieHaveBeenCalledWith(serieId)
  })
})
