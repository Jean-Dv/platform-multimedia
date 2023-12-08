import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateRoleDomainEventAttributes {
  readonly name: string
}

export class RoleCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'role.created'

  public readonly name: string

  constructor({
    aggregateId,
    name,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    name: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: RoleCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.name = name
  }

  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreateRoleDomainEventAttributes
  }): DomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params
    return new RoleCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      eventId,
      occurredOn
    })
  }

  public toPrimitives(): CreateRoleDomainEventAttributes {
    const { name } = this
    return {
      name
    }
  }
}
