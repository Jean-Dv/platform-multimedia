import { SearchSeasonsByCriteriaQueryHandler } from '@Multimedia/Season/application/SearchByCriteria/SearchSeasonsByCriteriaQueryHandler'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import { SeasonMother } from '../../domain/SeasonMother'
import { SeasonsByCriteriaSearcher } from '@Multimedia/Season/application/SearchByCriteria/SeasonsByCriteriaSearcher'
import { SearchSeasonsByCriteriaQuery } from '@Multimedia/Season/application/SearchByCriteria/SearchSeasonsByCriteriaQuery'
import { SearchSeasonsByCriteriaResponseMother } from './SearchSeasonsByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchSeasonsByCriteriaQueryHandler', () => {
  let repository: SeasonRepositoryMock

  beforeEach(() => {
    repository = new SeasonRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const series = [
      SeasonMother.random(),
      SeasonMother.random(),
      SeasonMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(series)

    const handler = new SearchSeasonsByCriteriaQueryHandler(
      new SeasonsByCriteriaSearcher(repository)
    )
    const filterName = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Friends']
    ])
    const filters = new Array<Map<string, string>>(filterName)
    const query = new SearchSeasonsByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchSeasonsByCriteriaResponseMother.create(series)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })

  it('should find movies filter by criteria with order, limit and offset', async () => {
    const series = [
      SeasonMother.random(),
      SeasonMother.random(),
      SeasonMother.random()
    ]
    repository.searchByCriteriaMockReturnValue(series)

    const handler = new SearchSeasonsByCriteriaQueryHandler(
      new SeasonsByCriteriaSearcher(repository)
    )
    const filterTitle = new Map<string, string>([
      ['field', 'title'],
      ['operator', 'CONTAINS'],
      ['value', 'Friends']
    ])

    const filters = new Array<Map<string, string>>(filterTitle)
    const orderBy = 'releaseYear'
    const orderType = OrderTypes.DESC
    const query = new SearchSeasonsByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)
    const expected = SearchSeasonsByCriteriaResponseMother.create(series)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
