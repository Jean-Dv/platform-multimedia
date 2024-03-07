import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchPlansByCriteriaQuery } from './SearchPlansByCriteriaQuery'
import { type PlansResponse } from '../PlansResponse'
import { type PlansByCriteriaSearcher } from './PlansByCriteriaSearcher'
import { type Query } from '@Shared/domain/Query'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'

/**
 * Represents a query handler to search plans by criteria.
 */
export class SearchPlansByCriteriaQueryHandler
  implements QueryHandler<SearchPlansByCriteriaQuery, PlansResponse>
{
  constructor(private readonly searcher: PlansByCriteriaSearcher) {}

  public subscribedTo(): Query {
    return SearchPlansByCriteriaQuery
  }

  public async handle(
    query: SearchPlansByCriteriaQuery
  ): Promise<PlansResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
