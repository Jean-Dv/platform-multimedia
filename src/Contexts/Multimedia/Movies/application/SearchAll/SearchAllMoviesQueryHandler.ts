import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { MoviesResponse } from '../MoviesResponse'
import { SearchAllMoviesQuery } from './SearchAllMoviesQuery'
import { type MoviesFinder } from './MoviesFinder'
import { type Query } from '@Shared/domain/Query'

export class SearchAllMoviesQueryHandler
  implements QueryHandler<SearchAllMoviesQuery, MoviesResponse>
{
  constructor(private readonly moviesFinder: MoviesFinder) {}

  public subscribedTo(): Query {
    return SearchAllMoviesQuery
  }

  public async handle(_query: SearchAllMoviesQuery): Promise<MoviesResponse> {
    return new MoviesResponse(await this.moviesFinder.run())
  }
}
