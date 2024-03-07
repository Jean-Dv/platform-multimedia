import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { type Plan } from '@Subscriptions/Plans/domain/Plan'
import { type PlanRepository } from '@Subscriptions/Plans/domain/PlanRepository'

/**
 * Mock of the PlanRepository interface.
 */
export class PlanRepositoryMock implements PlanRepository {
  private readonly mockSave: jest.Mock
  private readonly mockMatching: jest.Mock
  private readonly plans: Plan[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockMatching = jest.fn()
  }

  public async save(plan: Plan): Promise<void> {
    this.mockSave(plan)
  }

  public async matching(criteria: Criteria): Promise<Plan[]> {
    this.mockMatching(criteria)
    return this.plans
  }

  /**
   * Asserts that the `save` method was called with the given plan.
   *
   * @param plan - The plan to assert that was saved
   */
  public assertSaveHaveBeenCalledWith(plan: Plan): void {
    expect(this.mockSave).toHaveBeenCalledWith(plan)
  }

  /**
   * Asserts that the `matching` method was called with the given criteria.
   *
   * @param criteria - The criteria to assert that was used
   */
  public assertMatchingHaveBeenCalled(): void {
    expect(this.mockMatching).toHaveBeenCalled()
  }

  /**
   * Sets the value to be returned by the `matching` method.
   *
   * @param plans - The plans to be returned
   */
  public matchingMockReturnValue(plans: Plan[]): void {
    this.plans.push(...plans)
  }
}
