import { UserCreatedDomainEvent } from '@Auth/User/domain/UserCreatedDomainEvent'
import { type User } from '@Auth/User/domain/User'

export class UserCreatedDomainEventMother {
  public static create({
    aggregateId,
    eventId,
    firstName,
    lastName,
    email,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    firstName: string
    lastName: string
    email: string
    occurredOn?: Date
  }): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      aggregateId,
      eventId,
      firstName,
      lastName,
      email,
      occurredOn
    })
  }

  public static fromUser(user: User): UserCreatedDomainEvent {
    return this.create({
      aggregateId: user.id.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value
    })
  }
}
