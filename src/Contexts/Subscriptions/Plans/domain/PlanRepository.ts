import { type Plan } from './Plan'

/**
 * Interface for the repository of plans
 */
export interface PlanRepository {
  /**
   * Saves a plan to the repository.
   *
   * @param plan - The plan to be saved.
   */
  save: (plan: Plan) => Promise<void>
}
