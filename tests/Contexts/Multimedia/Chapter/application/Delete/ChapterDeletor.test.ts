import { ChapterDeletor } from '@Multimedia/Chapter/application/Delete/ChapterDeletor'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import { ChapterMother } from '../../domain/ChapterMother'

describe('ChapterDeletor', () => {
  it('deletes a chapter', async () => {
    const chapter = ChapterMother.random()

    const repository = new ChapterRepositoryMock()
    const creator = new ChapterDeletor(repository)

    await creator.run(chapter.id.value)
    repository.assertDeleteHaveBeenCalledWith(chapter.id)
  })
})
