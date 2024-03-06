import { type BackofficePlan } from '@BackofficeSubscriptions/Plans/domain/BackofficePlan'
import { type BackofficePlanRepository } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanRepository'

/**
 * Mock of the PlanRepository interface.
 */
export class BackofficePlanRepositoryMock implements BackofficePlanRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(plan: BackofficePlan): Promise<void> {
    this.mockSave(plan)
  }

  /**
   * Asserts that the `save` method was called with the given plan.
   *
   * @param plan - The plan to assert that was saved
   */
  public assertSaveHaveBeenCalledWith(plan: BackofficePlan): void {
    expect(this.mockSave).toHaveBeenCalledWith(plan)
  }
}
