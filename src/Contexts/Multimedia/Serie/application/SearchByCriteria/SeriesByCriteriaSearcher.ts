import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { SeriesResponse } from '../SeriesResponse'
import { Criteria } from '@Shared/domain/criteria/Criteria'

/**
 * Represents a class responsible for searching series based on specified criteria.
 */
export class SeriesByCriteriaSearcher {
  constructor(private readonly repository: SerieRepository) {}

  /**
   * Executes the serie search based on provided criteria.
   *
   * @param filters - The filters to be applied to the serie search.
   * @param order - The order in which the series should be retrieved.
   * @param limit - The maximum number of series to retrieve (optional).
   * @param offset - The offset for paginating the serie results (optional).
   * @returns A promise that resolves to a SeriesResponse containing the matched series.
   */
  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<SeriesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const series = await this.repository.matching(criteria)
    return new SeriesResponse(series)
  }
}
