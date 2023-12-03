import { SeasonCreator } from '@Multimedia/Season/application/Create/SeasonCreator'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateSeasonCommandHandler } from '@Multimedia/Season/application/Create/CreateSeasonCommandHandler'
import { CreateSeasonCommandMother } from './CreateSeasonCommandMother'
import { SeasonMother } from '../../domain/SeasonMother'
import { SeasonCreatedDomainEventMother } from '../../domain/SeasonCreatedDomainEventMother'
import { SeasonTitleLengthExceeded } from '@Multimedia/Season/domain/SeasonTitleLengthExceeded'
import { SerieMother } from '../../../Serie/domain/SerieMother'

let repository: SeasonRepositoryMock
let creator: SeasonCreator
let eventBus: EventBusMock
let handler: CreateSeasonCommandHandler

beforeEach(() => {
  repository = new SeasonRepositoryMock()
  eventBus = new EventBusMock()
  creator = new SeasonCreator(repository, eventBus)
  handler = new CreateSeasonCommandHandler(creator)
})

describe('CreateSeasonCommandHandler', () => {
  it('should create a valid season', async () => {
    const serie = SerieMother.random() // TODO:: Validate the serie exist in logic
    const command = CreateSeasonCommandMother.random(serie.id)
    const season = SeasonMother.from(command)
    const domainEvent = SeasonCreatedDomainEventMother.fromSeason(season)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(season)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateSeasonCommandMother.invalid()
      const season = SeasonMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(season)
    } catch (error) {
      expect(error).toBeInstanceOf(SeasonTitleLengthExceeded)
    }
  })
})
