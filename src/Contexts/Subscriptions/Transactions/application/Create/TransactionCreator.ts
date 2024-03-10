import { type EventBus } from '@Shared/domain/EventBus'
import { type PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { type PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { type UserId } from '@Subscriptions/Shared/domain/UserId'
import { Transaction } from '@Subscriptions/Transactions/domain/Transaction'
import { type TransactionId } from '@Subscriptions/Transactions/domain/TransactionId'
import { type TransactionRepository } from '@Subscriptions/Transactions/domain/TransactionRepository'

/**
 * Transaction creator service.
 */
export class TransactionCreator {
  constructor(
    private readonly repository: TransactionRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the transaction creation process.
   *
   * @param params - Parameters for creating the transaction.
   */
  public async run(params: {
    id: TransactionId
    planId: PlanId
    planDuration: PlanDaysDuration
    userId: UserId
  }): Promise<void> {
    const transaction = Transaction.create(
      params.id,
      params.planId,
      params.planDuration,
      params.userId
    )

    await this.repository.save(transaction)
    await this.eventBus.publish(transaction.pullDomainEvents())
  }
}
