import { PlansResponse } from '@Subscriptions/Plans/application/PlansResponse'
import { type Plan } from '@Subscriptions/Plans/domain/Plan'

/**
 * Class for the creation of plans response for testing purposes.
 */
export class SearchPlansByCriteriaResponseMother {
  /**
   * Creates a plans response with the given plans.
   *
   * @param plans - The plans to be returned.
   * @returns The plans response with the given plans.
   */
  public static create(plans: Plan[]): PlansResponse {
    return new PlansResponse(plans)
  }
}
