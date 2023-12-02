import { SearchSeriesByCriteriaQueryHandler } from '@Multimedia/Serie/application/SearchByCriteria/SearchSeriesByCriteriaQueryHandler'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import { SerieMother } from '../../domain/SerieMother'
import { SeriesByCriteriaSearcher } from '@Multimedia/Serie/application/SearchByCriteria/SeriesByCriteriaSearcher'
import { SearchSeriesByCriteriaQuery } from '@Multimedia/Serie/application/SearchByCriteria/SearchSeriesByCriteriaQuery'
import { SearchSeriesByCriteriaResponseMother } from './SearchSeriesByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchMoviesByCriteriaQueryHandler', () => {
  let repository: SerieRepositoryMock

  beforeEach(() => {
    repository = new SerieRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const series = [
      SerieMother.random(),
      SerieMother.random(),
      SerieMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(series)

    const handler = new SearchSeriesByCriteriaQueryHandler(
      new SeriesByCriteriaSearcher(repository)
    )
    const filterName = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Friends']
    ])
    const filters = new Array<Map<string, string>>(filterName)
    const query = new SearchSeriesByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchSeriesByCriteriaResponseMother.create(series)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })

  it('should find movies filter by criteria with order, limit and offset', async () => {
    const series = [
      SerieMother.random(),
      SerieMother.random(),
      SerieMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(series)

    const handler = new SearchSeriesByCriteriaQueryHandler(
      new SeriesByCriteriaSearcher(repository)
    )
    const filterTitle = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Friends']
    ])

    const filters = new Array<Map<string, string>>(filterTitle)
    const orderBy = 'releaseDate'
    const orderType = OrderTypes.DESC
    const query = new SearchSeriesByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)
    const expected = SearchSeriesByCriteriaResponseMother.create(series)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
