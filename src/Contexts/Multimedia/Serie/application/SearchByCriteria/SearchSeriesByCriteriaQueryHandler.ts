import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchSeriesByCriteriaQuery } from './SearchSeriesByCriteriaQuery'
import { type SeriesResponse } from '../SeriesResponse'
import { type SeriesByCriteriaSearcher } from './SeriesByCriteriaSearcher'
import { type Query } from '@Shared/domain/Query'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'

/**
 * Represents a query handler for searching series based on specified criteria.
 */
export class SearchSeriesByCriteriaQueryHandler
  implements QueryHandler<SearchSeriesByCriteriaQuery, SeriesResponse>
{
  constructor(private readonly searcher: SeriesByCriteriaSearcher) {}

  public subscribedTo(): Query {
    return SearchSeriesByCriteriaQuery
  }

  public async handle(
    query: SearchSeriesByCriteriaQuery
  ): Promise<SeriesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)
    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
