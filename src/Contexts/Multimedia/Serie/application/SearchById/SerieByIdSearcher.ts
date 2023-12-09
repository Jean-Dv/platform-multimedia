import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieResponse } from '../SerieResponse'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'

export class SerieByIdSearcher {
  constructor(private readonly repository: SerieRepository) {}

  public async run(id: SerieId): Promise<SerieResponse> {
    const serie = await this.repository.searchById(id)
    if (serie === null) {
      throw new SerieNotFound(`Serie with id <${id.value}> not found`)
    }
    return new SerieResponse(serie)
  }
}
