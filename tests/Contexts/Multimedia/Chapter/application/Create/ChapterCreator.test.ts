import { ChapterCreator } from '@Multimedia/Chapter/application/Create/ChapterCreator'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import { ChapterMother } from '../../domain/ChapterMother'

describe('ChapterCreator', () => {
  it('creates a new chapter', async () => {
    const chapter = ChapterMother.random()

    const repository = new ChapterRepositoryMock()
    const creator = new ChapterCreator(repository)

    await creator.run(
      chapter.id.value,
      chapter.title.value,
      chapter.releaseYear.value,
      chapter.season.value,
      chapter.video.value
    )
    repository.assertSaveHaveBeenCalledWith(chapter)
  })
})
