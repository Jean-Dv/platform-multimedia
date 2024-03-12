import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { Serie } from '@Multimedia/Serie/domain/Serie'
import { SerieReleaseYear } from '@Multimedia/Serie/domain/SerieReleaseYear'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { SerieSynopsis } from '@Multimedia/Serie/domain/SerieSynopsis'
import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

/**
 * Service responsible for creating a serie.
 */
export class SerieCreator {
  constructor(private readonly repository: SerieRepository) {}

  /**
   * Creates a new serie with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the serie.
   */
  public async run(
    id: string,
    title: string,
    releaseYear: number,
    synopsis: string,
    categories: string[]
  ): Promise<void> {
    const serie = new Serie(
      new SerieId(id),
      new SerieTitle(title),
      new SerieReleaseYear(releaseYear),
      new SerieSynopsis(synopsis),
      categories.map((category) => new CategoryId(category))
    )

    await this.repository.save(serie)
  }
}
