import { PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { UserId } from '@Subscriptions/Shared/domain/UserId'
import { Transaction } from '@Subscriptions/Transactions/domain/Transaction'
import { TransactionId } from '@Subscriptions/Transactions/domain/TransactionId'
import { TransactionIdMother } from './TransactionIdMother'
import { PlanIdMother } from '../../Shared/domain/PlanIdMother'
import { PlanDaysDurationMother } from '../../Shared/domain/PlanDaysDurationMother'
import { UserIdMother } from '../../Shared/domain/UserIdMother'
import { type CreateTransactionCommand } from '@Subscriptions/Transactions/application/Create/CreateTransactionCommand'

/**
 * Factory to create Transaction value objects
 */
export class TransactionMother {
  /**
   * Creates a Transaction value object.
   *
   * @param id - The id to create the Transaction
   * @param planId - The planId to create the Transaction
   * @param planDuration - The planDuration to create the Transaction
   * @param userId - The userId to create the Transaction
   * @returns An instance of Transaction
   */
  public static create(
    id: TransactionId,
    planId: PlanId,
    planDuration: PlanDaysDuration,
    userId: UserId
  ): Transaction {
    return new Transaction(id, planId, planDuration, userId)
  }

  /**
   * Creates a Transaction value object from a command.
   *
   * @param command - The command to create the Transaction
   * @returns An instance of Transaction
   */
  public static from(command: CreateTransactionCommand): Transaction {
    return this.create(
      new TransactionId(command.id),
      new PlanId(command.planId),
      new PlanDaysDuration(command.planDuration),
      new UserId(command.userId)
    )
  }

  /**
   * Creates a random Transaction value object.
   *
   * @returns A random Transaction value object
   */
  public static random(): Transaction {
    return this.create(
      TransactionIdMother.random(),
      PlanIdMother.random(),
      PlanDaysDurationMother.random(),
      UserIdMother.random()
    )
  }
}
