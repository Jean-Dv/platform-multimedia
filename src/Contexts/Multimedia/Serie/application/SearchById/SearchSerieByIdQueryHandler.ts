import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchSerieByIdQuery } from './SearchSerieByIdQuery'
import { type SerieResponse } from '../SerieResponse'
import { type SerieByIdSearcher } from './SerieByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export class SearchSerieByIdQueryHandler
  implements QueryHandler<SearchSerieByIdQuery, SerieResponse>
{
  constructor(private readonly searcher: SerieByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchSerieByIdQuery
  }

  public async handle(query: SearchSerieByIdQuery): Promise<SerieResponse> {
    const id = new SerieId(query.id)
    return await this.searcher.run(id)
  }
}
