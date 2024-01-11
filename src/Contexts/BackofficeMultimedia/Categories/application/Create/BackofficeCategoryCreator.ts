import { type EventBus } from '@Shared/domain/EventBus'
import { type BackofficeCategoryRepository } from '../../domain/BackofficeCategoryRepository'
import { type BackofficeCategoryId } from '../../domain/BackofficeCategoryId'
import { type BackofficeCategoryName } from '../../domain/BackofficeCategoryName'
import { BackofficeCategory } from '../../domain/BackofficeCategory'

export class BackofficeCategoryCreator {
  constructor(
    private readonly repository: BackofficeCategoryRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(params: {
    id: BackofficeCategoryId
    name: BackofficeCategoryName
  }): Promise<void> {
    const category = BackofficeCategory.create(params.id, params.name)
    await this.repository.save(category)
    await this.eventBus.publish(category.pullDomainEvents())
  }
}
