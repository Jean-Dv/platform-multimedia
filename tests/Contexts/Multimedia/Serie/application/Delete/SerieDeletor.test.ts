import { SerieDeletor } from '@Multimedia/Serie/application/Delete/SerieDeletor'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import { SerieMother } from '../../domain/SerieMother'

describe('SerieDeletor', () => {
  it('deletes a serie', async () => {
    const serie = SerieMother.random()

    const repository = new SerieRepositoryMock()
    const deletor = new SerieDeletor(repository)

    await deletor.run(serie.id.value)
    repository.assertDeleteHaveBeenCalledWith(serie.id)
  })
})
