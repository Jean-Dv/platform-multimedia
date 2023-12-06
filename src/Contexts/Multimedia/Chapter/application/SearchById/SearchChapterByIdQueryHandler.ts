import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchChapterByIdQuery } from './SearchChapterByIdQuery'
import { type ChapterWithPermissionsResponse } from '../ChapterWithPermissionsResponse'
import { type ChapterByIdSearcher } from './ChapterByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { ChapterId } from '@Multimedia/Chapter/domain/ChapterId'

/**
 * Represents a query handler for searching chapter based on specified id.
 */
export class SearchChapterByIdQueryHandler
  implements
    QueryHandler<SearchChapterByIdQuery, ChapterWithPermissionsResponse>
{
  constructor(private readonly searcher: ChapterByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchChapterByIdQuery
  }

  public async handle(
    query: SearchChapterByIdQuery
  ): Promise<ChapterWithPermissionsResponse> {
    const id = new ChapterId(query.id)
    return await this.searcher.run(id)
  }
}
