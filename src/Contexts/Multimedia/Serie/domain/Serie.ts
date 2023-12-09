import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SerieId } from '../../Shared/domain/Serie/SerieId'
import { SerieTitle } from './SerieTitle'
import { SerieReleaseDate } from './SerieReleaseDate'
import { SerieCreatedDomainEvent } from './SerieCreatedDomainEvent'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

/**
 * Serie aggregate root entity.
 */
export class Serie extends AggregateRoot {
  public readonly id: SerieId
  public readonly category: CategoryName
  public readonly title: SerieTitle
  public readonly releaseDate: SerieReleaseDate

  constructor(
    id: SerieId,
    category: CategoryName,
    title: SerieTitle,
    releaseDate: SerieReleaseDate
  ) {
    super()
    this.id = id
    this.category = category
    this.title = title
    this.releaseDate = releaseDate
  }

  /**
   * Creates a new Serie instance with the provided information and
   * publishes a SerieCreatedDomainEvent.
   *
   * @param id - The id of the serie.
   * @param title - The name of the serie.
   * @param releaseDate - The release date of the serie.
   * @returns A new Serie instance.
   */
  public static create(
    id: SerieId,
    category: CategoryName,
    title: SerieTitle,
    releaseDate: SerieReleaseDate
  ): Serie {
    const serie = new Serie(id, category, title, releaseDate)
    serie.record(
      new SerieCreatedDomainEvent({
        aggregateId: id.value,
        category: category.value,
        title: title.value,
        releaseDate: releaseDate.value
      })
    )
    return serie
  }

  /**
   * Create a new Serie from primitives.
   *
   * @param plainDate - The plain object containing the serie information.
   * @returns A new Serie instance.
   */
  public static fromPrimitive(plainData: {
    id: string
    category: string
    title: string
    releaseDate: Date
  }): Serie {
    return new Serie(
      new SerieId(plainData.id),
      new CategoryName(plainData.category),
      new SerieTitle(plainData.title),
      new SerieReleaseDate(plainData.releaseDate)
    )
  }

  /**
   * Convert the serie to primitive values.
   *
   * @returns The plain object with the serie information.
   */
  public toPrimitives(): {
    id: string
    category: string
    title: string
    releaseDate: Date
  } {
    return {
      id: this.id.value,
      category: this.category.value,
      title: this.title.value,
      releaseDate: this.releaseDate.value
    }
  }
}
