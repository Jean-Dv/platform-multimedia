import { SearchChapterByIdQueryHandler } from '@Multimedia/Chapter/application/SearchById/SearchChapterByIdQueryHandler'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import { ChapterMother } from '../../domain/ChapterMother'
import { ChapterByIdSearcher } from '@Multimedia/Chapter/application/SearchById/ChapterByIdSearcher'
import { SearchChapterByIdQuery } from '@Multimedia/Chapter/application/SearchById/SearchChapterByIdQuery'
import { SearchChapterByIdResponseMother } from './SearchChapterByIdResponseMother'
import { ChapterIdMother } from '../../domain/ChapterIdMother'
import { ChapterNotFound } from '@Multimedia/Chapter/domain/ChapterNotFound'

describe('SearchChapterByIdQueryHandler', () => {
  let repository: ChapterRepositoryMock

  beforeEach(() => {
    repository = new ChapterRepositoryMock()
  })

  it('should find chapter by id', async () => {
    const chapters = [
      ChapterMother.random(),
      ChapterMother.random(),
      ChapterMother.random()
    ]
    repository.searchMockReturnValue(chapters[1])

    const handler = new SearchChapterByIdQueryHandler(
      new ChapterByIdSearcher(repository)
    )
    const query = new SearchChapterByIdQuery(chapters[1].id.value)
    const response = await handler.handle(query)
    const expected = SearchChapterByIdResponseMother.create(chapters[1])
    repository.assertSearchHaveBeenCalledWith(chapters[1].id)
    expect(expected).toEqual(response)
  })

  it('should not find chapter by id', async () => {
    try {
      const chapters = [
        ChapterMother.random(),
        ChapterMother.random(),
        ChapterMother.random()
      ]
      repository.searchMockReturnValue(chapters[1])

      const handler = new SearchChapterByIdQueryHandler(
        new ChapterByIdSearcher(repository)
      )
      const idForTest = ChapterIdMother.random()
      const query = new SearchChapterByIdQuery(idForTest.value)
      await handler.handle(query)
      SearchChapterByIdResponseMother.create(chapters[1])
      repository.assertSearchHaveBeenCalledWith(idForTest)
    } catch (error) {
      expect(error).toBeInstanceOf(ChapterNotFound)
    }
  })
})
