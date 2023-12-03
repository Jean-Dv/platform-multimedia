import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { SeasonsResponse } from '../SeasonsResponse'
import { Criteria } from '@Shared/domain/criteria/Criteria'

/**
 * Represents a class responsible for searching seasons based on specified criteria.
 */
export class SeasonsByCriteriaSearcher {
  constructor(private readonly repository: SeasonRepository) {}

  /**
   * Executes the season search based on provided criteria.
   *
   * @param filters - The filters to be applied to the season search.
   * @param order - The order in which the seasons should be retrieved.
   * @param limit - The maximum number of seasons to retrieve (optional).
   * @param offset - The offset for paginating the season results (optional).
   * @returns A promise that resolves to a SeasonsResponse containing the matched seasons.
   */
  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<SeasonsResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const seasons = await this.repository.matching(criteria)
    return new SeasonsResponse(seasons)
  }
}
