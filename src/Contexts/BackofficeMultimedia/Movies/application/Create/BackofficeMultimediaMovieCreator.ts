import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { type BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { type BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { type BackofficeMultimediaMovieRepository } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieRepository'
import { type BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'
import { type BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { type BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for creating backoffice multimedia movies.
 */
export class BackofficeMultimediaMovieCreator {
  constructor(
    private readonly repository: BackofficeMultimediaMovieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the movie creation process.
   *
   * @param params - Parameters for creating the movie.
   * @returns A Promise that resolves when the movie is successfully created and saved.
   */
  public async run(params: {
    id: BackofficeMultimediaMovieId
    title: BackofficeMultimediaMovieTitle
    releaseYear: BackofficeMultimediaMovieReleaseYear
    synopsis: BackofficeMultimediaMovieSynopsis
    categories: BackofficeMultimediaCategoryId[]
    videoId: BackofficeMultimediaVideoId
  }): Promise<void> {
    const movie = BackofficeMultimediaMovie.create(
      params.id,
      params.title,
      params.releaseYear,
      params.synopsis,
      params.categories,
      params.videoId
    )

    await this.repository.save(movie)
    await this.eventBus.publish(movie.pullDomainEvents())
  }
}
