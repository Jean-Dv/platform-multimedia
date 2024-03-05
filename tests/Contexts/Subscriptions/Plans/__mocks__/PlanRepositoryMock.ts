import { type Plan } from '@Subscriptions/Plans/domain/Plan'
import { type PlanRepository } from '@Subscriptions/Plans/domain/PlanRepository'

/**
 * Mock of the PlanRepository interface.
 */
export class PlanRepositoryMock implements PlanRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(plan: Plan): Promise<void> {
    this.mockSave(plan)
  }

  /**
   * Asserts that the `save` method was called with the given plan.
   *
   * @param plan - The plan to assert that was saved
   */
  public assertSaveHaveBeenCalledWith(plan: Plan): void {
    expect(this.mockSave).toHaveBeenCalledWith(plan)
  }
}
