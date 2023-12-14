import { Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type EventBus } from '@Shared/domain/EventBus'

export class SerieDeletor {
  constructor(
    private readonly repository: SerieRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(id: SerieId): Promise<void> {
    const serie = await this.repository.searchById(id)
    if (serie === null) {
      throw new SerieNotFound(`The serie <${id.value}> does not exist`)
    }
    const serieToDelete = Serie.delete(
      serie.id,
      serie.category,
      serie.title,
      serie.releaseDate
    )
    await this.repository.delete(serieToDelete.id)
    await this.eventBus.publish(serieToDelete.pullDomainEvents())
  }
}
