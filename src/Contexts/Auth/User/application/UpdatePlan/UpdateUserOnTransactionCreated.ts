import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { TransactionCreatedDomainEvent } from '@Subscriptions/Transactions/domain/TransactionCreatedDomainEvent'
import { type UserPlanUpdater } from './UserPlanUpdater'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for updating the user plan when a transaction is created.
 */
export class UpdateUserOnTransactionCreated
  implements DomainEventSubscriber<TransactionCreatedDomainEvent>
{
  constructor(private readonly updater: UserPlanUpdater) {}

  public subscribedTo(): DomainEventClass[] {
    return [TransactionCreatedDomainEvent]
  }

  public async on(domainEvent: TransactionCreatedDomainEvent): Promise<void> {
    const { userId, planDuration, occurredOn } = domainEvent
    const startDate = occurredOn
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + planDuration)
    await this.updater.run(userId, startDate, endDate)
  }
}
