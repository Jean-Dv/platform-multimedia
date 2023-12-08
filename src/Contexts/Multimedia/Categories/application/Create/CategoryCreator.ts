import { Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryName } from '@Multimedia/Categories/domain/CategoryName'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { type EventBus } from '@Shared/domain/EventBus'

export class CategoryCreator {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(params: {
    id: CategoryId
    name: CategoryName
  }): Promise<void> {
    const category = Category.create(params.id, params.name)
    await this.repository.save(category)
    await this.eventBus.publish(category.pullDomainEvents())
  }
}
