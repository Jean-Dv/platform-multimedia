import { PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { TransactionId } from './TransactionId'
import { UserId } from '@Subscriptions/Shared/domain/UserId'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { TransactionCreatedDomainEvent } from './TransactionCreatedDomainEvent'

/**
 * Represents a transaction in the system.
 */
export class Transaction extends AggregateRoot {
  public readonly id: TransactionId
  public readonly planId: PlanId
  public readonly planDuration: PlanDaysDuration
  public readonly userId: UserId

  constructor(
    id: TransactionId,
    planId: PlanId,
    planDuration: PlanDaysDuration,
    userId: UserId
  ) {
    super()
    this.id = id
    this.planId = planId
    this.planDuration = planDuration
    this.userId = userId
  }

  /**
   * Create a new transaction.
   *
   * @param id - The transaction id.
   * @param planId - The plan id.
   * @param planDuration - The plan duration.
   * @param userId - The user id.
   * @returns An instance of the Transaction class.
   */
  public static create(
    id: TransactionId,
    planId: PlanId,
    planDuration: PlanDaysDuration,
    userId: UserId
  ): Transaction {
    const transaction = new Transaction(id, planId, planDuration, userId)
    transaction.record(
      new TransactionCreatedDomainEvent({
        aggregateId: id.value,
        eventId: id.value,
        occurredOn: new Date(),
        planId: planId.value,
        planDuration: planDuration.value,
        userId: userId.value
      })
    )

    return transaction
  }

  /**
   * Create a new transaction from primitives.
   *
   * @param params - The transaction parameters.
   * @returns An instance of the Transaction class.
   */
  public static fromPrimitives(params: {
    id: string
    planId: string
    planDuration: number
    userId: string
  }): Transaction {
    return new Transaction(
      new TransactionId(params.id),
      new PlanId(params.planId),
      new PlanDaysDuration(params.planDuration),
      new UserId(params.userId)
    )
  }

  /**
   * Convert the transaction to its primitive representation.
   *
   * @returns The transaction parameters.
   */
  public toPrimitives(): {
    id: string
    planId: string
    planDuration: number
    userId: string
  } {
    return {
      id: this.id.value,
      planId: this.planId.value,
      planDuration: this.planDuration.value,
      userId: this.userId.value
    }
  }
}
