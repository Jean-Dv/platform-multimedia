import { DomainEvent } from '@Shared/domain/DomainEvent'

interface TransactionCreatedDomainEventAttributes {
  readonly planId: string
  readonly planDuration: number
  readonly userId: string
}

/**
 * This class is used to represents the domain which is published when a new transaction is created.
 */
export class TransactionCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'subscriptions.transaction.created'

  public readonly planId: string
  public readonly planDuration: number
  public readonly userId: string

  constructor({
    aggregateId,
    planId,
    planDuration,
    userId,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    planId: string
    planDuration: number
    userId: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: TransactionCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.planId = planId
    this.planDuration = planDuration
    this.userId = userId
  }

  /**
   * This method returns a new instance of this domain event
   * using the provided parameters.
   *
   * @param params - The parameters to be used to created the new instance.
   * @returns A new instance of this domain event.
   */
  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: TransactionCreatedDomainEventAttributes
  }): TransactionCreatedDomainEvent {
    return new TransactionCreatedDomainEvent({
      aggregateId: params.aggregateId,
      eventId: params.eventId,
      occurredOn: params.occurredOn,
      planId: params.attributes.planId,
      planDuration: params.attributes.planDuration,
      userId: params.attributes.userId
    })
  }

  /**
   * This method returns the attributes of this domain event.
   *
   * @returns The attributes of this domain event.
   */
  public toPrimitives(): TransactionCreatedDomainEventAttributes {
    return {
      planId: this.planId,
      planDuration: this.planDuration,
      userId: this.userId
    }
  }
}
