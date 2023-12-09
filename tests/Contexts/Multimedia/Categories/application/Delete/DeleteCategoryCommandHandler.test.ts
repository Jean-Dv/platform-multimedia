import { CategoryDeletor } from '@Multimedia/Categories/application/Delete/CategoryDeletor'
import { CategoryRepositoryMock } from '../../__mocks__/CategoryRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteCategoryCommandHandler } from '@Multimedia/Categories/application/Delete/DeleteCategoryCommandHandler'
import { CategoryMother } from '../../domain/CategoryMother'
import { DeleteCategoryCommandMother } from './DeleteCategoryCommandMother'
import { CategoryDeletedDomainEventMother } from '../../domain/CategoryDeletedDomainEventMother'
import { CategoryNotFound } from '@Multimedia/Categories/domain/CategoryNotFound'

let repository: CategoryRepositoryMock
let deletor: CategoryDeletor
let eventBus: EventBusMock
let handler: DeleteCategoryCommandHandler

beforeEach(() => {
  repository = new CategoryRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new CategoryDeletor(repository, eventBus)
  handler = new DeleteCategoryCommandHandler(deletor)
})

describe('DeleteCategoryCommandHandler', () => {
  it('should delete a valid category', async () => {
    const categories = [
      CategoryMother.random(),
      CategoryMother.random(),
      CategoryMother.random()
    ]
    repository.searchMockReturnValue(categories[0])

    const command = DeleteCategoryCommandMother.create(categories[0].id)
    const domainEvent = CategoryDeletedDomainEventMother.fromCategory(
      categories[0]
    )

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(categories[0].id)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when category does not exist', async () => {
    try {
      const command = DeleteCategoryCommandMother.random()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(CategoryNotFound)
    }
  })
})
