import { type Transaction } from '@Subscriptions/Transactions/domain/Transaction'
import { TransactionCreatedDomainEvent } from '@Subscriptions/Transactions/domain/TransactionCreatedDomainEvent'

/**
 * Factory to create TransactionCreatedDomainEvent domain events
 */
export class TransactionCreatedDomainEventMother {
  /**
   * Creates a TransactionCreatedDomainEvent domain event.
   *
   * @param aggregateId - The aggregate id
   * @param eventId - The event id
   * @param userId - The user id
   * @param planId - The plan id
   * @param planDuration - The plan duration
   * @param occurredOn - The event occurred on
   * @returns An instance of TransactionCreatedDomainEvent
   */
  public static create({
    aggregateId,
    eventId,
    userId,
    planId,
    planDuration,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    userId: string
    planId: string
    planDuration: number
    occurredOn?: Date
  }): TransactionCreatedDomainEvent {
    return new TransactionCreatedDomainEvent({
      aggregateId,
      userId,
      planId,
      planDuration,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a TransactionCreatedDomainEvent domain event from a transaction.
   *
   * @param transaction - The transaction to create the event
   * @returns An instance of TransactionCreatedDomainEvent
   */
  public static from(transaction: Transaction): TransactionCreatedDomainEvent {
    return this.create({
      aggregateId: transaction.id.value,
      planId: transaction.planId.value,
      planDuration: transaction.planDuration.value,
      userId: transaction.userId.value
    })
  }
}
