import { type Criteria } from '@Shared/domain/criteria/Criteria'
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

  /**
   * Returns the plans that match the given criteria.
   *
   * @param criteria - The criteria to be used.
   * @returns The plans that match the given criteria.
   */
  matching: (criteria: Criteria) => Promise<Plan[]>
}
