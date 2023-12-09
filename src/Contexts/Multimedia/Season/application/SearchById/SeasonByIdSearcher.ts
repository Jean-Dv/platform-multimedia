import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SeasonResponse } from '../SeasonResponse'
import { SeasonNotFound } from '@Multimedia/Season/domain/SeasonNotFound'

export class SeasonByIdSearcher {
  constructor(private readonly repository: SeasonRepository) {}

  public async run(id: SeasonId): Promise<SeasonResponse> {
    const season = await this.repository.searchById(id)
    if (season === null) {
      throw new SeasonNotFound(`Season with id <${id.value}> not found`)
    }
    return new SeasonResponse(season)
  }
}
