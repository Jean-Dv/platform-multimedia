import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { Criteria } from '@Shared/domain/criteria/Criteria'
import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { CategoriesResponse } from '../CategoriesResponse'

export class CategoriesByCriteriaSearcher {
  constructor(private readonly repository: CategoryRepository) {}

  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<CategoriesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const categories = await this.repository.matching(criteria)

    return new CategoriesResponse(categories)
  }
}
