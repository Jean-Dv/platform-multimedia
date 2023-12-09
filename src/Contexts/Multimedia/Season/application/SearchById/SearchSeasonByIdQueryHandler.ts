import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type Query } from '@Shared/domain/Query'
import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { type SeasonResponse } from '../SeasonResponse'
import { SearchSeasonByIdQuery } from './SearchSeasonByIdQuery'
import { type SeasonByIdSearcher } from './SeasonByIdSearcher'

export class SearchSeasonByIdQueryHandler
  implements QueryHandler<SearchSeasonByIdQuery, SeasonResponse>
{
  constructor(private readonly searcher: SeasonByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchSeasonByIdQuery
  }

  public async handle(query: SearchSeasonByIdQuery): Promise<SeasonResponse> {
    const id = new SeasonId(query.id)
    return await this.searcher.run(id)
  }
}
