import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchMultimediaUserByIdQuery } from './SearchMultimediaUserByIdQuery'
import { type MultimediaUserResponse } from '../MultimediaUserResponse'
import { type MultimediaUserByIdSearcher } from './MultimediaUserByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'

export class SearchMultimediaUserByIdQueryHandler
  implements
    QueryHandler<SearchMultimediaUserByIdQuery, MultimediaUserResponse>
{
  constructor(private readonly searcher: MultimediaUserByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchMultimediaUserByIdQuery
  }

  public async handle(
    query: SearchMultimediaUserByIdQuery
  ): Promise<MultimediaUserResponse> {
    const id = new MultimediaUserId(query.id)
    return await this.searcher.run(id)
  }
}
