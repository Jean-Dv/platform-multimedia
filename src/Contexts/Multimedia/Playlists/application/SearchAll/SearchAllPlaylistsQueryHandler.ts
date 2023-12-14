import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchAllPlaylistsQuery } from './SearchAllPlaylistsQuery'
import { PlaylistsResponse } from '../PlaylistsResponse'
import { type PlaylistFinder } from './PlaylistFinder'
import { type Query } from '@Shared/domain/Query'
import { MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'

export class SearchAllPlaylistsQueryHandler
  implements QueryHandler<SearchAllPlaylistsQuery, PlaylistsResponse>
{
  constructor(private readonly finder: PlaylistFinder) {}

  public subscribedTo(): Query {
    return SearchAllPlaylistsQuery
  }

  public async handle(
    query: SearchAllPlaylistsQuery
  ): Promise<PlaylistsResponse> {
    const userId = new MultimediaUserId(query.userId)
    return new PlaylistsResponse(await this.finder.run(userId))
  }
}
