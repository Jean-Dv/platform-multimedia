import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type EventBus } from '@Shared/domain/EventBus'

export class SerieCreator {
  constructor(
    private readonly repository: SerieRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Creates a new serie with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the serie.
   */
  public async run(params: {
    id: SerieId
    title: SerieTitle
    releaseDate: SerieReleaseDate
  }): Promise<void> {
    const serie = Serie.create(params.id, params.title, params.releaseDate)
    await this.repository.save(serie)
    await this.eventBus.publish(serie.pullDomainEvents())
  }
}
