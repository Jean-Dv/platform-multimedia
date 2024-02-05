import { BackofficeMultimediaMovieTitle } from './BackofficeMultimediaMovieTitle'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaMovieId } from './BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieReleaseYear } from './BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from './BackofficeMultimediaMovieSynopsis'
import { BackofficeMultimediaMovieCreatedDomainEvent } from './BackofficeMultimediaMovieCreatedDomainEvent'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'

/**
 * BackofficeMultimediaMovie is an aggregate root representing a movie in the backoffice.
 */
export class BackofficeMultimediaMovie extends AggregateRoot {
  public readonly id: BackofficeMultimediaMovieId
  public readonly title: BackofficeMultimediaMovieTitle
  public readonly releaseYear: BackofficeMultimediaMovieReleaseYear
  public readonly synopsis: BackofficeMultimediaMovieSynopsis
  public readonly categories: BackofficeMultimediaCategoryId[] = []
  public readonly videoId: BackofficeMultimediaVideoId

  constructor(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis,
    categories: BackofficeMultimediaCategoryId[],
    videoId: BackofficeMultimediaVideoId
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
    this.videoId = videoId
  }

  public static create(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis,
    categories: BackofficeMultimediaCategoryId[],
    videoId: BackofficeMultimediaVideoId
  ): BackofficeMultimediaMovie {
    const movie = new BackofficeMultimediaMovie(
      id,
      title,
      releaseYear,
      synopsis,
      categories,
      videoId
    )
    movie.record(
      new BackofficeMultimediaMovieCreatedDomainEvent({
        aggregateId: movie.id.value,
        title: movie.title.value,
        releaseYear: movie.releaseYear.value,
        synopsis: movie.synopsis.value,
        categories: movie.categories.map((category) => category.value),
        videoId: movie.videoId.value
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
    categories: string[]
    videoId: string
  }): BackofficeMultimediaMovie {
    return new BackofficeMultimediaMovie(
      new BackofficeMultimediaMovieId(plainData.id),
      new BackofficeMultimediaMovieTitle(plainData.title),
      new BackofficeMultimediaMovieReleaseYear(plainData.releaseYear),
      new BackofficeMultimediaMovieSynopsis(plainData.synopsis),
      plainData.categories.map(
        (categoryId) => new BackofficeMultimediaCategoryId(categoryId)
      ),
      new BackofficeMultimediaVideoId(plainData.videoId)
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
    categories: string[]
    videoId: string
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseYear: this.releaseYear.value,
      synopsis: this.synopsis.value,
      categories: this.categories.map((category) => category.value),
      videoId: this.videoId.value
    }
  }
}
