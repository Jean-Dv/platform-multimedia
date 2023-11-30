import { MoviesByCriteriaSearcher } from '@Multimedia/Movies/application/SearchByCriteria/MoviesByCriteriaSearcher'
import { SearchMoviesByCriteriaQuery } from '@Multimedia/Movies/application/SearchByCriteria/SearchMoviesByCriteriaQuery'
import { SearchMoviesByCriteriaQueryHandler } from '@Multimedia/Movies/application/SearchByCriteria/SearchMoviesByCriteriaQueryHandler'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieMother } from '../../domain/MovieMother'
import { SearchMoviesByCriteriaResponseMother } from './SearchMoviesByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchMoviesByCriteriaQueryHandler', () => {
  let repository: MovieRepositoryMock

  beforeEach(() => {
    repository = new MovieRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const movies = [
      MovieMother.random(),
      MovieMother.random(),
      MovieMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(movies)

    const handler = new SearchMoviesByCriteriaQueryHandler(
      new MoviesByCriteriaSearcher(repository)
    )
    const filterName = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Matrix']
    ])
    const filterDuration = new Map<string, string>([
      ['field', 'duration'],
      ['operator', '>'],
      ['value', '10']
    ])
    const filters = new Array<Map<string, string>>(filterName, filterDuration)
    const query = new SearchMoviesByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchMoviesByCriteriaResponseMother.create(movies)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })

  it('should find movies filter by criteria with order, limit and offset', async () => {
    const movies = [
      MovieMother.random(),
      MovieMother.random(),
      MovieMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(movies)

    const handler = new SearchMoviesByCriteriaQueryHandler(
      new MoviesByCriteriaSearcher(repository)
    )
    const filterName = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Matrix']
    ])
    const filterDuration = new Map<string, string>([
      ['field', 'duration'],
      ['operator', '>'],
      ['value', '10']
    ])

    const filters = new Array<Map<string, string>>(filterName, filterDuration)
    const orderBy = 'title'
    const orderType = OrderTypes.ASC

    const query = new SearchMoviesByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)

    const expected = SearchMoviesByCriteriaResponseMother.create(movies)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
