import { UserCreatedDomainEvent } from '@Auth/User/domain/UserCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'
import { type MultimediaUserCreator } from './MultimediaUserCreator'

export class CreateMultimediaUserOnUserCreated
  implements DomainEventSubscriber<UserCreatedDomainEvent>
{
  constructor(private readonly creator: MultimediaUserCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent]
  }

  public async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
    const { aggregateId } = domainEvent
    await this.creator.run(aggregateId)
  }
}
