import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSerieCreatedDomainEvent } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieCreatedDomainEvent'

/**
 * Factory class for creating instances of `BackofficeMultimediaSerieCreatedDomainEvent` for testing.
 */
export class BackofficeMultimediaSerieCreatedDomainEventMother {
  /**
   * Creates a `BackofficeMultimediaSerieCreatedDomainEvent` with the specified parameters.
   *
   * @param params - The parameters to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaSerieCreatedDomainEvent`.
   */
  public static create({
    aggregateId,
    title,
    releaseYear,
    synopsis,
    categories,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
    eventId?: string
    occurredOn?: Date
  }): BackofficeMultimediaSerieCreatedDomainEvent {
    return new BackofficeMultimediaSerieCreatedDomainEvent({
      aggregateId,
      title,
      releaseYear,
      synopsis,
      categories,
      eventId,
      occurredOn
    })
  }

  /**
   * Creates a `BackofficeMultimediaSerieCreatedDomainEvent` from the specified serie.
   *
   * @param serie - The `BackofficeMultimediaSerie` to create the event from.
   * @returns An instance of `BackofficeMultimediaSerieCreatedDomainEvent`.
   */
  public static from(
    serie: BackofficeMultimediaSerie
  ): BackofficeMultimediaSerieCreatedDomainEvent {
    return this.create({
      aggregateId: serie.id.value,
      title: serie.title.value,
      releaseYear: serie.releaseYear.value,
      synopsis: serie.synopsis.value,
      categories: serie.categories.map((category) => category.value)
    })
  }
}
