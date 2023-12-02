import { SearchChaptersByCriteriaQueryHandler } from '@Multimedia/Chapter/application/SearchByCriteria/SearchChaptersByCriteriaQueryHandler'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import { ChapterMother } from '../../domain/ChapterMother'
import { ChaptersByCriteriaSearcher } from '@Multimedia/Chapter/application/SearchByCriteria/ChaptersByCriteriaSearcher'
import { SearchChaptersByCriteriaQuery } from '@Multimedia/Chapter/application/SearchByCriteria/SearchChaptersByCriteriaQuery'
import { SearchChaptersByCriteriaResponseMother } from './SearchChaptersByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchChaptersByCriteriaQueryHandler', () => {
  let repository: ChapterRepositoryMock

  beforeEach(() => {
    repository = new ChapterRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const chapters = [
      ChapterMother.random(),
      ChapterMother.random(),
      ChapterMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(chapters)

    const handler = new SearchChaptersByCriteriaQueryHandler(
      new ChaptersByCriteriaSearcher(repository)
    )
    const filterDuration = new Map<string, string>([
      ['field', 'duration'],
      ['operator', '>'],
      ['value', '10']
    ])
    const filters = new Array<Map<string, string>>(filterDuration)
    const query = new SearchChaptersByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchChaptersByCriteriaResponseMother.create(chapters)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })

  it('should find chapters filter by criteria with order, limit and offset', async () => {
    const chapters = [
      ChapterMother.random(),
      ChapterMother.random(),
      ChapterMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(chapters)

    const handler = new SearchChaptersByCriteriaQueryHandler(
      new ChaptersByCriteriaSearcher(repository)
    )
    const filterDuration = new Map<string, string>([
      ['field', 'duration'],
      ['operator', '>'],
      ['value', '10']
    ])

    const filters = new Array<Map<string, string>>(filterDuration)
    const orderBy = 'title'
    const orderType = OrderTypes.DESC

    const query = new SearchChaptersByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)

    const expected = SearchChaptersByCriteriaResponseMother.create(chapters)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
