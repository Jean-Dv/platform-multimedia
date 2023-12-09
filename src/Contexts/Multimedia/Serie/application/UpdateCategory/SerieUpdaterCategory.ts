import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

export class SerieUpdaterCategory {
  constructor(private readonly repository: SerieRepository) {}

  public async run(name: string): Promise<void> {
    const category = new CategoryName(name)
    await this.repository.updateSeriesByCategory(category)
  }
}
