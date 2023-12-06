import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { MovieId } from './MovieId'
import { MovieTitle } from './MovieTitle'
import { MovieReleaseDate } from './MovieReleaseDate'
import { MovieDuration } from './MovieDuration'
import { MovieCreatedDomainEvent } from './MovieCreatedDomainEvent'
import { MovieUrl } from './MovieUrl'

export class Movie extends AggregateRoot {
  public readonly id: MovieId
  public readonly title: MovieTitle
  public readonly releaseDate: MovieReleaseDate
  public readonly url: MovieUrl
  public readonly duration: MovieDuration

  constructor(
    id: MovieId,
    title: MovieTitle,
    releaseDate: MovieReleaseDate,
    url: MovieUrl,
    duration: MovieDuration
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseDate = releaseDate
    this.url = url
    this.duration = duration
  }

  /**
   * Creates a new Movie instance with the provided information
   * and publishes a MovieCreatedDomainEvent.
   *
   * @param id - The id of the movie.
   * @param title - The name of the movie.
   * @param releaseDate - The release date of the movie.
   * @param duration - The duration of the movie.
   */
  public static create(
    id: MovieId,
    title: MovieTitle,
    releaseDate: MovieReleaseDate,
    url: MovieUrl,
    duration: MovieDuration
  ): Movie {
    const movie = new Movie(id, title, releaseDate, url, duration)
    movie.record(
      new MovieCreatedDomainEvent({
        aggregateId: movie.id.value,
        title: movie.title.value,
        releaseDate: movie.releaseDate.value,
        url: movie.url.value,
        duration: movie.duration.value
      })
    )
    return movie
  }

  /**
   * Create a new Movie from primitives.
   *
   * @param plainDate - The plain object containing the movie information.
   * @returns A new Movie instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    title: string
    releaseDate: Date
    url: string
    duration: number
  }): Movie {
    return new Movie(
      new MovieId(plainData.id),
      new MovieTitle(plainData.title),
      new MovieReleaseDate(plainData.releaseDate),
      new MovieUrl(plainData.url),
      new MovieDuration(plainData.duration)
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
    releaseDate: Date
    url: string
    duration: number
  } {
    return {
      id: this.id.value,
      title: this.title.value,
      releaseDate: this.releaseDate.value,
      url: this.url.value,
      duration: this.duration.value
    }
  }
}
