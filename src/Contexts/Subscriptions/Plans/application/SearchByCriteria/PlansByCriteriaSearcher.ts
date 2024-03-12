import { type Filters } from '@Shared/domain/criteria/Filters'
import { type Order } from '@Shared/domain/criteria/Order'
import { type PlanRepository } from '@Subscriptions/Plans/domain/PlanRepository'
import { PlansResponse } from '../PlansResponse'
import { Criteria } from '@Shared/domain/criteria/Criteria'

/**
 * Service for searching plans by criteria.
 */
export class PlansByCriteriaSearcher {
  constructor(private readonly repository: PlanRepository) {}

  /**
   * Get the plans that match the given criteria.
   *
   * @param filters - The filters to be used.
   * @param order - The order to be used.
   * @param limit - The maximum number of plans to be returned.
   * @param offset - The number of plans to be skipped.
   * @returns The plans that match the given criteria.
   */
  public async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number
  ): Promise<PlansResponse> {
    const criteria = new Criteria(filters, order, limit, offset)
    const plans = await this.repository.matching(criteria)

    return new PlansResponse(plans)
  }
}
