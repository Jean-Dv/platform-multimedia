import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchCategoriesByCriteriaQuery } from './SearchCategoriesByCriteriaQuery'
import { type CategoriesResponse } from '../CategoriesResponse'
import { type CategoriesByCriteriaSearcher } from './CategoriesByCriteriaSearcher'
import { type Query } from '@Shared/domain/Query'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'

/**
 * Represents a query handler to search categories by criteria.
 */
export class SearchCategoriesByCriteriaQueryHandler
  implements QueryHandler<SearchCategoriesByCriteriaQuery, CategoriesResponse>
{
  constructor(private readonly searcher: CategoriesByCriteriaSearcher) {}

  public subscribedTo(): Query {
    return SearchCategoriesByCriteriaQuery
  }

  public async handle(
    query: SearchCategoriesByCriteriaQuery
  ): Promise<CategoriesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
