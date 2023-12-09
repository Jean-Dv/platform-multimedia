import { DomainEvent } from '@Shared/domain/DomainEvent'

interface CreateUserDomainEventAttributes {
  readonly roleName: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly eventName: string
  readonly aggregateId: string
}

/**
 * This class is used to represent the domain event
 * which is emitted when a user is created
 */
export class UserCreatedDomainEvent extends DomainEvent {
  public static readonly EVENT_NAME = 'user.created'

  public readonly roleName: string
  public readonly firstName: string
  public readonly lastName: string
  public readonly email: string

  constructor({
    aggregateId,
    roleName,
    firstName,
    lastName,
    email,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    roleName: string
    firstName: string
    lastName: string
    email: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn
    })
    this.roleName = roleName
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  /**
   * This method returns a new instance of this domain event
   * using the provided parameters.
   *
   * @param params The parameters to be used to created the new instance.
   * @returns A new instance of this domain event.
   */
  public static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CreateUserDomainEventAttributes
  }): DomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params
    return new UserCreatedDomainEvent({
      aggregateId,
      roleName: attributes.roleName,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      email: attributes.email,
      eventId,
      occurredOn
    })
  }

  /**
   * This method returns the attributes of the domain event
   * in a primitive form.
   *
   * @returns The attributes of the domain event.
   */
  public toPrimitives(): CreateUserDomainEventAttributes {
    const { roleName, firstName, lastName, email, aggregateId } = this
    return {
      roleName,
      firstName,
      lastName,
      email,
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      aggregateId
    }
  }
}
