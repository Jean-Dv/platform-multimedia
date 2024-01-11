import { BackofficeMultimediaMovieTitle } from './BackofficeMultimediaMovieTitle'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaMovieId } from './BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieReleaseYear } from './BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from './BackofficeMultimediaMovieSynopsis'
import { BackofficeMultimediaMovieCreatedDomainEvent } from './BackofficeMultimediaMovieCreatedDomainEvent'

/**
 * BackofficeMultimediaMovie is an aggregate root representing a movie in the backoffice.
 */
export class BackofficeMultimediaMovie extends AggregateRoot {
  public readonly id: BackofficeMultimediaMovieId
  public readonly title: BackofficeMultimediaMovieTitle
  public readonly releaseYear: BackofficeMultimediaMovieReleaseYear
  public readonly synopsis: BackofficeMultimediaMovieSynopsis

  constructor(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
  }

  public static create(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis
  ): BackofficeMultimediaMovie {
    const movie = new BackofficeMultimediaMovie(
      id,
      title,
      releaseYear,
      synopsis
    )
    movie.record(
      new BackofficeMultimediaMovieCreatedDomainEvent({
        aggregateId: movie.id.value,
        title: movie.title.value,
        releaseYear: movie.releaseYear.value,
        synopsis: movie.synopsis.value
      })
    )
    return movie
  }

  /**
   * Create a new BackofficeMultimediaMovie from primitives.
   *
   * @param plainData- The plain object containing the movie information.
   * @returns A new instance of the BackofficeMultimediaMovie entity.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseYear: number
    synopsis: string
  }): BackofficeMultimediaMovie {
    return new BackofficeMultimediaMovie(
      new BackofficeMultimediaMovieId(plainData.id),
      new BackofficeMultimediaMovieTitle(plainData.title),
      new BackofficeMultimediaMovieReleaseYear(plainData.releaseYear),
      new BackofficeMultimediaMovieSynopsis(plainData.synopsis)
    )
  }

  /**
   * Convert the movie to primitives.
   *
   * @returns The plain object containing the movie information.
   */
  public toPrimitives(): {
    id: string
    title: string
    releaseYear: number
    synopsis: string
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      synopsis: this.synopsis.value
    }
  }
}
