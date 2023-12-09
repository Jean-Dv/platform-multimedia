import { type MovieRepository } from '@Multimedia/Movies/domain/MovieRepository'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

export class MovieUpdaterCategory {
  constructor(private readonly repository: MovieRepository) {}

  public async run(name: string): Promise<void> {
    const category = new CategoryName(name)
    await this.repository.updateMoviesByCategory(category)
  }
}
