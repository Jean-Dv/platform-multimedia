import { type EventBus } from '@Shared/domain/EventBus'
import { type BackofficeMultimediaCategoryRepository } from '../../domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaCategoryId } from '../../../Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaCategoryName } from '../../domain/BackofficeMultimediaCategoryName'
import { BackofficeMultimediaCategory } from '../../domain/BackofficeMultimediaCategory'

export class BackofficeMultimediaCategoryCreator {
  constructor(
    private readonly repository: BackofficeMultimediaCategoryRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(params: {
    id: BackofficeMultimediaCategoryId
    name: BackofficeMultimediaCategoryName
  }): Promise<void> {
    const category = BackofficeMultimediaCategory.create(params.id, params.name)
    await this.repository.save(category)
    await this.eventBus.publish(category.pullDomainEvents())
  }
}
