import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { MovieId } from './MovieId'
import { MovieTitle } from './MovieTitle'
import { MovieReleaseYear } from './MovieReleaseYear'
import { MovieSynopsis } from './MovieSynopsis'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { VideoId } from '@Multimedia/Shared/domain/Video/VideoId'

/**
 * Movie is an aggregate root representing a movie.
 */
export class Movie extends AggregateRoot {
  public readonly id: MovieId
  public readonly title: MovieTitle
  public readonly releaseYear: MovieReleaseYear
  public readonly synopsis: MovieSynopsis
  public readonly categories: CategoryId[] = []
  public readonly videoId: VideoId

  constructor(
    id: MovieId,
    title: MovieTitle,
    releaseYear: MovieReleaseYear,
    synopsis: MovieSynopsis,
    categories: CategoryId[],
    videoId: VideoId
  ) {
    super()
    this.id = id
    this.title = title
    this.releaseYear = releaseYear
    this.synopsis = synopsis
    this.categories = categories
    this.videoId = videoId
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
    releaseYear: number
    synopsis: string
    categories: string[]
    videoId: string
  }): Movie {
    return new Movie(
      new MovieId(plainData.id),
      new MovieTitle(plainData.title),
      new MovieReleaseYear(plainData.releaseYear),
      new MovieSynopsis(plainData.synopsis),
      plainData.categories.map((category) => new CategoryId(category)),
      new VideoId(plainData.videoId)
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
