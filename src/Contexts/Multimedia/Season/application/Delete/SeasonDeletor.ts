import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export class SeasonDeletor {
  constructor(private readonly repository: SeasonRepository) {}

  public async run(id: string): Promise<void> {
    const serieId = new SerieId(id)
    await this.repository.deleteBySerie(serieId)
  }
}
