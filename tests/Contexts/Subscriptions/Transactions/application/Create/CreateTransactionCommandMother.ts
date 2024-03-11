import { type PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { type PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { type UserId } from '@Subscriptions/Shared/domain/UserId'
import { type CreateTransactionCommand } from '@Subscriptions/Transactions/application/Create/CreateTransactionCommand'
import { type TransactionId } from '@Subscriptions/Transactions/domain/TransactionId'
import { TransactionIdMother } from '../../domain/TransactionIdMother'
import { PlanIdMother } from '../../../Shared/domain/PlanIdMother'
import { PlanDaysDurationMother } from '../../../Shared/domain/PlanDaysDurationMother'
import { UserIdMother } from '../../../Shared/domain/UserIdMother'

/**
 * Utility class for creating `CreateTransactionCommand` instances for testing.
 */
export class CreateTransactionCommandMother {
  /**
   * Creates a valid `CreateTransactionCommand`.
   *
   * @param id - The ID for the command.
   * @param planId - The plan ID for the command.
   * @param planDuration - The plan duration for the command.
   * @param userId - The user ID for the command.
   * @returns A valid command.
   */
  public static create(
    id: TransactionId,
    planId: PlanId,
    planDuration: PlanDaysDuration,
    userId: UserId
  ): CreateTransactionCommand {
    return {
      id: id.value,
      planId: planId.value,
      planDuration: planDuration.value,
      userId: userId.value
    }
  }

  /**
   * Creates a random valid `CreateTransactionCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateTransactionCommand {
    return this.create(
      TransactionIdMother.random(),
      PlanIdMother.random(),
      PlanDaysDurationMother.random(),
      UserIdMother.random()
    )
  }
}
