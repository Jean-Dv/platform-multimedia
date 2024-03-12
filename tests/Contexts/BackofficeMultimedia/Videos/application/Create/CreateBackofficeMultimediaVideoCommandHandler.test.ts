import { BackofficeMultimediaVideoCreator } from '@BackofficeMultimedia/Videos/application/Create/BackofficeMultimediaVideoCreator'
import { BackofficeMultimediaVideoRepositoryMock } from './../../__mocks__/BackofficeMultimediaVideoRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaVideoCommandHandler } from '@BackofficeMultimedia/Videos/application/Create/CreateBackofficeMultimediaVideoCommandHandler'
import { CreateBackofficeMultimediaVideoCommandMother } from './CreateBackofficeMultimediaVideoCommandMother'
import { BackofficeMultimediaVideoMother } from '../../domain/BackofficeMultimediaVideoMother'
import { BackofficeMultimediaVideoCreatedDomainEventMother } from '../../domain/BackofficeMultimediaVideoCreatedDomainEventMother'

let repository: BackofficeMultimediaVideoRepositoryMock
let creator: BackofficeMultimediaVideoCreator
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaVideoCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaVideoRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaVideoCreator(repository, eventBus)
  handler = new CreateBackofficeMultimediaVideoCommandHandler(creator)
})

describe('CreateBackofficeMultimediaVideoCommandHandler', () => {
  it('should create a valid video', async () => {
    const command = CreateBackofficeMultimediaVideoCommandMother.random()
    const video = BackofficeMultimediaVideoMother.from(command)
    const domainEvent =
      BackofficeMultimediaVideoCreatedDomainEventMother.from(video)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(video)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })
})
