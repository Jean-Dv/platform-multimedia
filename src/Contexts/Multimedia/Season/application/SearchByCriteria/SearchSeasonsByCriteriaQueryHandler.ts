import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchSeasonsByCriteriaQuery } from './SearchSeasonsByCriteriaQuery'
import { type SeasonsResponse } from '../SeasonsResponse'
import { type SeasonsByCriteriaSearcher } from './SeasonByCriteriaSearcher'
import { type Query } from '@Shared/domain/Query'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'

/**
 * Represents a query for searching seasons based on specified criteria.
 */
export class SearchSeasonsByCriteriaQueryHandler
  implements QueryHandler<SearchSeasonsByCriteriaQuery, SeasonsResponse>
{
  constructor(private readonly searcher: SeasonsByCriteriaSearcher) {}

  public subscribedTo(): Query {
    return SearchSeasonsByCriteriaQuery
  }

  public async handle(
    query: SearchSeasonsByCriteriaQuery
  ): Promise<SeasonsResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)
    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
