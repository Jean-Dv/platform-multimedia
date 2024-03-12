import { BackofficeMultimediaCategoryCreator } from '@BackofficeMultimedia/Categories/application/Create/BackofficeMultimediaCategoryCreator'
import { BackofficeMultimediaCategoryRepositoryMock } from './../../__mocks__/BackofficeMultimediaCategoryRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaCategoryCommandHandler } from '@BackofficeMultimedia/Categories/application/Create/CreateBackofficeMultimediaCategoryCommandHandler'
import { CreateBackofficeMultimediaCategoryCommandMother } from './CreateBackofficeMultimediaCategoryCommandMother'
import { BackofficeMultimediaCategoryMother } from '../../domain/BackofficeMultimediaCategoryMother'
import { BackofficeMultimediaCategoryCreatedDomainEventMother } from '../../domain/BackofficeMultimediaCategoryCreatedDomainEventMother'
import { BackofficeMultimediaCategoryNameLengthIsExceeded } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryNameLengthIsExceeded'

let repository: BackofficeMultimediaCategoryRepositoryMock
let creator: BackofficeMultimediaCategoryCreator
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaCategoryCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaCategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaCategoryCreator(repository, eventBus)
  handler = new CreateBackofficeMultimediaCategoryCommandHandler(creator)
})

describe('CreateBackofficeMultimediaCategoryCommandHandler', () => {
  it('should create a valid category', async () => {
    const command = CreateBackofficeMultimediaCategoryCommandMother.random()
    const category = BackofficeMultimediaCategoryMother.from(command)
    const domainEvent =
      BackofficeMultimediaCategoryCreatedDomainEventMother.from(category)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(category)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateBackofficeMultimediaCategoryCommandMother.invalid()
      const category = BackofficeMultimediaCategoryMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(category)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaCategoryNameLengthIsExceeded
      )
    }
  })
})
