import { type Role } from '@Auth/Roles/domain/Role'
import { RoleCreatedDomainEvent } from '@Auth/Roles/domain/RoleCreatedDomainEvent'

export class RoleCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    name,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    name: string
    occurredOn?: Date
  }): RoleCreatedDomainEvent {
    return new RoleCreatedDomainEvent({
      aggregateId,
      eventId,
      name,
      occurredOn
    })
  }

  public static fromRole(role: Role): RoleCreatedDomainEvent {
    return this.create({
      aggregateId: role.id.value,
      name: role.name.value
    })
  }
}
