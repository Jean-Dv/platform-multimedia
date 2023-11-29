import { type Query } from '@Shared/domain/Query'
import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'
import { type MoviesResponse } from '../MoviesResponse'
import { type MoviesByCriteriaSearcher } from './MoviesByCriteriaSearcher'
import { SearchMoviesByCriteriaQuery } from './SearchMoviesByCriteriaQuery'

/**
 * Represents a query handler for searching movies based on specified criteria.
 */
export class SearchMoviesByCriteriaQueryHandler
  implements QueryHandler<SearchMoviesByCriteriaQuery, MoviesResponse>
{
  constructor(private readonly searcher: MoviesByCriteriaSearcher) {}

  /**
   * Gets the query type that this handler subscribes to.
   *
   * @returns The type of the query handled by this handler.
   */
  public subscribedTo(): Query {
    return SearchMoviesByCriteriaQuery
  }

  /**
   * Handles the search movies query and returns the matched movies.
   *
   * @param query - The search movies query containing search criteria.
   * @returns A promise that resolves to a MoviesResponse containing the matched movies.
   */
  public async handle(
    query: SearchMoviesByCriteriaQuery
  ): Promise<MoviesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)
    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
