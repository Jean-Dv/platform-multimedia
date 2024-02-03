import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { SerieId } from '../../Shared/domain/Serie/SerieId'
import { SerieTitle } from './SerieTitle'
import { SerieReleaseYear } from './SerieReleaseYear'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { SerieSynopsis } from './SerieSynopsis'

/**
 * Serie aggregate root entity.
 */
export class Serie extends AggregateRoot {
  public readonly id: SerieId
  public readonly title: SerieTitle
  public readonly releaseYear: SerieReleaseYear
  public readonly synopsis: SerieSynopsis
  public readonly categories: CategoryId[] = []

  constructor(
    id: SerieId,
    title: SerieTitle,
    releaseYear: SerieReleaseYear,
    synopsis: SerieSynopsis,
    categories: CategoryId[]
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
  }

  /**
   * Create a new Serie from primitives.
   *
   * @param plainDate - The plain object containing the serie information.
   * @returns A new Serie instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
  }): Serie {
    return new Serie(
      new SerieId(plainData.id),
      new SerieTitle(plainData.title),
      new SerieReleaseYear(plainData.releaseYear),
      new SerieSynopsis(plainData.synopsis),
      plainData.categories.map((category) => new CategoryId(category))
    )
  }

  /**
   * Convert the serie to primitive values.
   *
   * @returns The plain object with the serie information.
   */
  public toPrimitives(): {
    id: string
    title: string
    releaseYear: number
    synopsis: string
    categories: string[]
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      synopsis: this.synopsis.value,
      categories: this.categories.map((category) => category.value)
    }
  }
}
