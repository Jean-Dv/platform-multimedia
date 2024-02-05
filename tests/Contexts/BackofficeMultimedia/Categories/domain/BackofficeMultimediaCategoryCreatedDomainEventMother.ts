import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { BackofficeMultimediaCategoryCreatedDomainEvent } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryCreatedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaCategoryCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaCategoryCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaCategoryCreatedDomainEvent` with the specified parameters.
   *
   * @param params - The parameters to create the event.
   * @returns An instance of `BackofficeMultimediaCategoryCreatedDomainEvent`.
   */
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
  }): BackofficeMultimediaCategoryCreatedDomainEvent {
    return new BackofficeMultimediaCategoryCreatedDomainEvent({
      aggregateId,
      eventId,
      name,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaCategoryCreatedDomainEvent` from the specified category.
   *
   * @param category - The `BackofficeMultimediaCategory` to create the event from.
   * @returns An instance of `BackofficeMultimediaCategoryCreatedDomainEvent`.
   */
  public static from(
    category: BackofficeMultimediaCategory
  ): BackofficeMultimediaCategoryCreatedDomainEvent {
    return this.create({
      aggregateId: category.id.value,
      name: category.name.value
    })
  }
}
