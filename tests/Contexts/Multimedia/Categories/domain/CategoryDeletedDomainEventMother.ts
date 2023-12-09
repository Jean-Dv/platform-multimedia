import { type Category } from '@Multimedia/Categories/domain/Category'
import { CategoryDeletedDomainEvent } from '@Multimedia/Categories/domain/CategoryDeletedDomainEvent'

export class CategoryDeletedDomainEventMother {
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
  }): CategoryDeletedDomainEvent {
    return new CategoryDeletedDomainEvent({
      aggregateId,
      eventId,
      name,
      occurredOn
    })
  }

  public static fromCategory(category: Category): CategoryDeletedDomainEvent {
    return this.create({
      aggregateId: category.id.value,
      name: category.name.value
    })
  }
}
