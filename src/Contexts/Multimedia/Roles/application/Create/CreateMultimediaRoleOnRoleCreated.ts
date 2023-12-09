import { RoleCreatedDomainEvent } from '@Auth/Roles/domain/RoleCreatedDomainEvent'
import { type DomainEventSubscriber } from '@Shared/domain/DomainEventSubscriber'
import { type MultimediaRoleCreator } from './MultimediaRoleCreator'
import { type DomainEventClass } from '@Shared/domain/DomainEvent'

export class CreateMultimediaRoleOnRoleCreated
  implements DomainEventSubscriber<RoleCreatedDomainEvent>
{
  constructor(private readonly creator: MultimediaRoleCreator) {}

  public subscribedTo(): DomainEventClass[] {
    return [RoleCreatedDomainEvent]
  }

  public async on(domainEvent: RoleCreatedDomainEvent): Promise<void> {
    const { aggregateId, name } = domainEvent
    await this.creator.run(aggregateId, name)
  }
}
