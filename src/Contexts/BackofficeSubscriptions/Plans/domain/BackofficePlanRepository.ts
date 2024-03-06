import { type BackofficePlan } from './BackofficePlan'

/**
 * Interface for the repository of plans
 */
export interface BackofficePlanRepository {
  /**
   * Saves a plan to the repository.
   *
   * @param plan - The plan to be saved.
   */
  save: (plan: BackofficePlan) => Promise<void>
}
