import { SearchPlansByCriteriaQueryHandler } from '@Subscriptions/Plans/application/SearchByCriteria/SearchPlansByCriteriaQueryHandler'
import { PlanRepositoryMock } from '../../__mocks__/PlanRepositoryMock'
import { PlanMother } from '../../domain/PlanMother'
import { PlansByCriteriaSearcher } from '@Subscriptions/Plans/application/SearchByCriteria/PlansByCriteriaSearcher'
import { SearchPlansByCriteriaQuery } from '@Subscriptions/Plans/application/SearchByCriteria/SearchPlansByCriteriaQuery'
import { SearchPlansByCriteriaResponseMother } from './SearchPlansByCriteriaResponseMother'
import { OrderTypes } from '@Shared/domain/criteria/OrderType'

describe('SearchPlansByCriteriaQueryHandler', () => {
  let repository: PlanRepositoryMock

  beforeEach(() => {
    repository = new PlanRepositoryMock()
  })

  it('should find filter by criteria', async () => {
    const plans = [
      PlanMother.random(),
      PlanMother.random(),
      PlanMother.random()
    ]
    repository.matchingMockReturnValue(plans)

    const handler = new SearchPlansByCriteriaQueryHandler(
      new PlansByCriteriaSearcher(repository)
    )

    const filterName = new Map<string, string>([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'Basic']
    ])

    const filters = new Array<Map<string, string>>(filterName)
    const query = new SearchPlansByCriteriaQuery(filters)
    const response = await handler.handle(query)
    const expected = SearchPlansByCriteriaResponseMother.create(plans)
    repository.assertMatchingHaveBeenCalled()

    expect(expected).toEqual(response)
  })

  it('should find plans filter by criteria with order, limit and offset', async () => {
    const plans = [
      PlanMother.random(),
      PlanMother.random(),
      PlanMother.random()
    ]
    repository.matchingMockReturnValue(plans)

    const handler = new SearchPlansByCriteriaQueryHandler(
      new PlansByCriteriaSearcher(repository)
    )

    const filterName = new Map<string, string>([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'Basic']
    ])

    const filters = new Array<Map<string, string>>(filterName)
    const orderBy = 'name'
    const orderType = OrderTypes.ASC

    const query = new SearchPlansByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1
    )
    const response = await handler.handle(query)

    const expected = SearchPlansByCriteriaResponseMother.create(plans)
    repository.assertMatchingHaveBeenCalled()
    expect(expected).toEqual(response)
  })
})
