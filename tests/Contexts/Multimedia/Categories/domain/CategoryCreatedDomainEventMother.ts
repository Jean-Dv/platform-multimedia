import { type Category } from '@Multimedia/Categories/domain/Category'
import { CategoryCreatedDomainEvent } from '@Multimedia/Categories/domain/CategoryCreatedDomainEvent'

export class CategoryCreatedDomainEventMother {
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
  }): CategoryCreatedDomainEvent {
    return new CategoryCreatedDomainEvent({
      aggregateId,
      eventId,
      name,
      occurredOn
    })
  }

  public static fromCategory(category: Category): CategoryCreatedDomainEvent {
    return this.create({
      aggregateId: category.id.value,
      name: category.name.value
    })
  }
}
