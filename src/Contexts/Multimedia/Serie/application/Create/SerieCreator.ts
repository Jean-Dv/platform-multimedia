import { CategoryNotFound } from '@Multimedia/Categories/domain/CategoryNotFound'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type EventBus } from '@Shared/domain/EventBus'

export class SerieCreator {
  constructor(
    private readonly repository: SerieRepository,
    private readonly repositoryCategory: CategoryRepository,
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
    category: CategoryName
    title: SerieTitle
    releaseDate: SerieReleaseDate
  }): Promise<void> {
    const category = await this.repositoryCategory.searchByName(params.category)
    if (category === null) {
      throw new CategoryNotFound(`Category ${params.category.value} not found`)
    }
    const serie = Serie.create(
      params.id,
      params.category,
      params.title,
      params.releaseDate
    )
    await this.repository.save(serie)
    await this.eventBus.publish(serie.pullDomainEvents())
  }
}
