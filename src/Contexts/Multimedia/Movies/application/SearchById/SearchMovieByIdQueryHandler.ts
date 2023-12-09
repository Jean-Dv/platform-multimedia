import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchMovieByIdQuery } from './SearchMovieByIdQuery'
import { type MovieWithPermissionResponse } from '../MovieWithPermissionResponse'
import { type MovieByIdSearcher } from './MovieByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'

export class SearchMovieByIdQueryHandler
  implements QueryHandler<SearchMovieByIdQuery, MovieWithPermissionResponse>
{
  constructor(private readonly searcher: MovieByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchMovieByIdQuery
  }

  public async handle(
    query: SearchMovieByIdQuery
  ): Promise<MovieWithPermissionResponse> {
    const id = new MovieId(query.id)
    return await this.searcher.run(id)
  }
}
