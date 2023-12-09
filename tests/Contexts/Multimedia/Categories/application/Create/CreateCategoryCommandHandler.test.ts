import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CategoryRepositoryMock } from '../../__mocks__/CategoryRepositoryMock'
import { CreateCategoryCommandHandler } from '@Multimedia/Categories/application/Create/CreateCategoryCommandHandler'
import { CategoryCreator } from '@Multimedia/Categories/application/Create/CategoryCreator'
import { CategoryMother } from '../../domain/CategoryMother'
import { CreateCategoryCommandMother } from './CreateCategoryCommandMother'
import { CategoryCreatedDomainEventMother } from '../../domain/CategoryCreatedDomainEventMother'
import { CategoryNameLengthIsExceeded } from '@Multimedia/Categories/domain/CategoryNameLengthIsExceeded'

let repository: CategoryRepositoryMock
let creator: CategoryCreator
let eventBus: EventBusMock
let handler: CreateCategoryCommandHandler

beforeEach(() => {
  repository = new CategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new CategoryCreator(repository, eventBus)
  handler = new CreateCategoryCommandHandler(creator)
})

describe('CreateCategoryCommandHandler', () => {
  it('should create a valid category', async () => {
    const command = CreateCategoryCommandMother.random()
    const category = CategoryMother.from(command)
    const domainEvent = CategoryCreatedDomainEventMother.fromCategory(category)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(category)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateCategoryCommandMother.invalid()
      const category = CategoryMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(category)
    } catch (error) {
      expect(error).toBeInstanceOf(CategoryNameLengthIsExceeded)
    }
  })
})
