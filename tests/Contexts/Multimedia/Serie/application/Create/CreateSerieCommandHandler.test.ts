import { SerieCreator } from '@Multimedia/Serie/application/Create/SerieCreator'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateSerieCommandHandler } from '@Multimedia/Serie/application/Create/CreateSerieCommandHandler'
import { CreateSerieCommandMother } from './CreateSerieCommandMother'
import { SerieMother } from '../../domain/SerieMother'
import { SerieCreatedDomainEventMother } from '../../domain/SerieCreatedDomainEventMother'
import { SerieTitleLengthExceeded } from '@Multimedia/Serie/domain/SerieTitleLengthExceeded'

let repository: SerieRepositoryMock
let creator: SerieCreator
let eventBus: EventBusMock
let handler: CreateSerieCommandHandler

beforeEach(() => {
  repository = new SerieRepositoryMock()
  eventBus = new EventBusMock()
  creator = new SerieCreator(repository, eventBus)
  handler = new CreateSerieCommandHandler(creator)
})

describe('CreateSerieCommandHandler', () => {
  it('should create a valid serie', async () => {
    const command = CreateSerieCommandMother.random()
    const serie = SerieMother.from(command)
    const domainEvent = SerieCreatedDomainEventMother.fromSerie(serie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(serie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateSerieCommandMother.invalid()
      const serie = SerieMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(serie)
    } catch (error) {
      expect(error).toBeInstanceOf(SerieTitleLengthExceeded)
    }
  })
})
