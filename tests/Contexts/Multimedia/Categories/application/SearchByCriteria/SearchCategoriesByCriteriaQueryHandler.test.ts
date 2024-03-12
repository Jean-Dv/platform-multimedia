import { SearchCategoriesByCriteriaQueryHandler } from '@Multimedia/Categories/application/SearchByCriteria/SearchCategoriesByCriteriaQueryHandler'
import { CategoryRepositoryMock } from '../../__mocks__/CategoryRepositoryMock'
import { CategoryMother } from '../../domain/CategoryMother'
import { CategoriesByCriteriaSearcher } from '@Multimedia/Categories/application/SearchByCriteria/CategoriesByCriteriaSearcher'
import { SearchCategoriesByCriteriaQuery } from '@Multimedia/Categories/application/SearchByCriteria/SearchCategoriesByCriteriaQuery'
import { SearchCategoriesByCriteriaResponseMother } from './SearchCategoriesByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchCategoriesByCriteriaQueryHandler', () => {
  let repository: CategoryRepositoryMock

  beforeEach(() => {
    repository = new CategoryRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const categories = [
      CategoryMother.random(),
      CategoryMother.random(),
      CategoryMother.random()
    ]
    repository.matchingMockReturnValue(categories)

    const handler = new SearchCategoriesByCriteriaQueryHandler(
      new CategoriesByCriteriaSearcher(repository)
    )

    const filterName = new Map<string, string>([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'Horror']
    ])

    const filters = new Array<Map<string, string>>(filterName)
    const query = new SearchCategoriesByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchCategoriesByCriteriaResponseMother.create(categories)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })

  it('should find categories filter by criteria with order, limit and offset', async () => {
    const categories = [
      CategoryMother.random(),
      CategoryMother.random(),
      CategoryMother.random()
    ]
    repository.matchingMockReturnValue(categories)

    const handler = new SearchCategoriesByCriteriaQueryHandler(
      new CategoriesByCriteriaSearcher(repository)
    )

    const filterName = new Map<string, string>([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'Horror']
    ])

    const filters = new Array<Map<string, string>>(filterName)
    const orderBy = 'name'
    const orderType = OrderTypes.ASC

    const query = new SearchCategoriesByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)

    const expected = SearchCategoriesByCriteriaResponseMother.create(categories)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
