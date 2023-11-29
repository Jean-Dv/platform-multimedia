import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { MoviesResponse } from '../MoviesResponse'
import { Criteria } from '@Shared/domain/criteria/Criteria'

/**
 * Represents a class responsible for searching movies based on specified criteria.
 */
export class MoviesByCriteriaSearcher {
  constructor(private readonly repository: MovieRepository) {}

  /**
   * Executes the movie search based on provided criteria.
   *
   * @param filters - The filters to be applied to the movie search.
   * @param order - The order in which the movies should be retrieved.
   * @param limit - The maximum number of movies to retrieve (optional).
   * @param offset - The offset for paginating the movie results (optional).
   * @returns A promise that resolves to a MoviesResponse containing the matched movies.
   */
  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<MoviesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const movies = await this.repository.matching(criteria)
    return new MoviesResponse(movies)
  }
}
