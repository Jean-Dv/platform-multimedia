import { BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { type BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { type BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { type BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { type EventBus } from '@Shared/domain/EventBus'

/**
 * Service for creating backoffice multimedia series.
 */
export class BackofficeMultimediaSerieCreator {
  constructor(
    private readonly repository: BackofficeMultimediaSerieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Runs the serie creation process.
   *
   * @param params - Parameters for creating the serie.
   */
  public async run(params: {
    id: BackofficeMultimediaSerieId
    title: BackofficeMultimediaSerieTitle
    releaseYear: BackofficeMultimediaSerieReleaseYear
    synopsis: BackofficeMultimediaSerieSynopsis
    categories: BackofficeMultimediaCategoryId[]
  }): Promise<void> {
    const serie = BackofficeMultimediaSerie.create(
      params.id,
      params.title,
      params.releaseYear,
      params.synopsis,
      params.categories
    )

    await this.repository.save(serie)
    await this.eventBus.publish(serie.pullDomainEvents())
  }
}
