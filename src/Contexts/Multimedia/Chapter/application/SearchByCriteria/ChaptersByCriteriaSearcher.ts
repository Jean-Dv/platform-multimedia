import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { ChaptersResponse } from '../ChaptersResponse'
import { Criteria } from '@Shared/domain/criteria/Criteria'

/**
 * Represents a class responsible for searching movies based on specified criteria.
 */
export class ChaptersByCriteriaSearcher {
  constructor(private readonly repository: ChapterRepository) {}

  /**
   * Executes the chapter search based on provided criteria.
   *
   * @param filters - The filters to be applied to the chapter search.
   * @param order - The order in which the chapters should be retrieved.
   * @param limit - The maximum number of chapters to retrieve (optional).
   * @param offset - The offset for paginating the chapter results (optional).
   * @returns A promise that resolves to a ChaptersResponse containing the matched chapters.
   */
  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<ChaptersResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const chapters = await this.repository.matching(criteria)
    return new ChaptersResponse(chapters)
  }
}
