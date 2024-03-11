import { UserId } from '@Auth/Shared/domain/User/UserId'
import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'
import { UserStartPlanAfterEndPlan } from '@Auth/User/domain/UserStartPlanAfterEndPlan'

/**
 * Service that updates the user plan.
 */
export class UserPlanUpdater {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Updates the user plan.
   *
   * @param userId - The user id.
   * @param startPlan - The start plan date.
   * @param endPlan - The end plan date.
   */
  public async run(
    userId: string,
    startPlan: Date,
    endPlan: Date
  ): Promise<void> {
    // Validate the dates.
    this.validateDates(startPlan, endPlan)

    const user = await this.repository.searchById(new UserId(userId))
    if (user == null) {
      throw new UserNotFound(`User with id ${userId} not found.`)
    }
    user.updatePlan(startPlan, endPlan)
    await this.repository.save(user)
  }

  /**
   * Validates the dates.
   *
   * @param startPlan - The start plan date.
   * @param endPlan - The end plan date.
   */
  private validateDates(startPlan: Date, endPlan: Date): void {
    if (startPlan > endPlan) {
      throw new UserStartPlanAfterEndPlan(
        'The start plan date must be before the end plan date.'
      )
    }
  }
}
