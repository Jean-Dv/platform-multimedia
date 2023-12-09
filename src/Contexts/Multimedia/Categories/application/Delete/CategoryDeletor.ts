import { Category } from '@Multimedia/Categories/domain/Category'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryNotFound } from '@Multimedia/Categories/domain/CategoryNotFound'
import { type CategoryRepository } from '@Multimedia/Categories/domain/CategoryRepository'
import { type EventBus } from '@Shared/domain/EventBus'

export class CategoryDeletor {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(id: CategoryId): Promise<void> {
    const category = await this.repository.search(id)
    if (category === null) {
      throw new CategoryNotFound(`The category <${id.value}> does not exist`)
    }
    const categoryToDelete = Category.delete(category.id, category.name)
    await this.repository.delete(categoryToDelete.id)
    await this.eventBus.publish(categoryToDelete.pullDomainEvents())
  }
}
