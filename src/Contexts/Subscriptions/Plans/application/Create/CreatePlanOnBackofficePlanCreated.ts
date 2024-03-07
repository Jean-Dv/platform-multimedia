import { BackofficePlanCreatedDomainEvent } from '@BackofficeSubscriptions/Plans/domain/BackofficePlanCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type PlanCreator } from './PlanCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

/**
 * Event subscriber for creating a plan when a backoffice plan is created.
 */
export class CreatePlanOnBackofficePlanCreated
  implements DomainEventSubscriber<BackofficePlanCreatedDomainEvent>
{
  constructor(private readonly creator: PlanCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [BackofficePlanCreatedDomainEvent]
  }

  public async on(
    domainEvent: BackofficePlanCreatedDomainEvent
  ): Promise<void> {
    const { aggregateId, name, price, duration, description } = domainEvent

    await this.creator.run(aggregateId, name, price, duration, description)
  }
}
