import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchChaptersByCriteriaQuery } from './SearchChaptersByCriteriaQuery'
import { type ChaptersResponse } from '../ChaptersResponse'
import { type ChaptersByCriteriaSearcher } from './ChaptersByCriteriaSearcher'
import { Filters } from '@Shared/domain/criteria/Filters'
import { Order } from '@Shared/domain/criteria/Order'
import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query handler for searching chapters based on specified criteria.
 */
export class SearchChaptersByCriteriaQueryHandler
  implements QueryHandler<SearchChaptersByCriteriaQuery, ChaptersResponse>
{
  constructor(private readonly searcher: ChaptersByCriteriaSearcher) {}

  public subscribedTo(): Query {
    return SearchChaptersByCriteriaQuery
  }

  public async handle(
    query: SearchChaptersByCriteriaQuery
  ): Promise<ChaptersResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)
    return await this.searcher.run(filters, order, query.limit, query.offset)
  }
}
