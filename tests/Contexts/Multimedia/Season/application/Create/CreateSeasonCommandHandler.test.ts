import { SeasonCreator } from '@Multimedia/Season/application/Create/SeasonCreator'
import { SeasonRepositoryMock } from '../../__mocks__/SeasonRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateSeasonCommandHandler } from '@Multimedia/Season/application/Create/CreateSeasonCommandHandler'
import { CreateSeasonCommandMother } from './CreateSeasonCommandMother'
import { SeasonMother } from '../../domain/SeasonMother'
import { SeasonCreatedDomainEventMother } from '../../domain/SeasonCreatedDomainEventMother'
import { SeasonTitleLengthExceeded } from '@Multimedia/Season/domain/SeasonTitleLengthExceeded'
import { SerieMother } from '../../../Serie/domain/SerieMother'
import QueryBusMock from '../../../../Shared/infrastructure/QueryBus/__mocks__/QueryBusMock'
import { SearchSerieByIdResponseMother } from '../../../Serie/application/SearchById/SearchSerieByIdResponseMother'
import { SearchSerieByIdQuery } from '@Multimedia/Serie/application/SearchById/SearchSerieByIdQuery'
import { SerieNotFound } from '@Multimedia/Serie/domain/SerieNotFound'

let repository: SeasonRepositoryMock
let creator: SeasonCreator
let eventBus: EventBusMock
let queryBus: QueryBusMock
let handler: CreateSeasonCommandHandler

beforeEach(() => {
  repository = new SeasonRepositoryMock()
  eventBus = new EventBusMock()
  queryBus = new QueryBusMock()
  creator = new SeasonCreator(repository, queryBus, eventBus)
  handler = new CreateSeasonCommandHandler(creator)
})

describe('CreateSeasonCommandHandler', () => {
  it('should create a valid season', async () => {
    const serie = SerieMother.random()
    const query = new SearchSerieByIdQuery(serie.id.value)
    const response = SearchSerieByIdResponseMother.create(serie)
    queryBus.askMockReturnValue(response)

    const command = CreateSeasonCommandMother.randomWithSerie(serie.id)
    const season = SeasonMother.from(command)
    const domainEvent = SeasonCreatedDomainEventMother.fromSeason(season)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(season)
    queryBus.assertAskSpyHaveBeenCalledWith(query)
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

  it('should throw an error when serie does not exist', async () => {
    try {
      const serie = SerieMother.random()
      const response = SearchSerieByIdResponseMother.invalid(serie)
      queryBus.askMockReturnValue(response)

      const command = CreateSeasonCommandMother.random()
      const season = SeasonMother.from(command)

      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(season)
    } catch (error) {
      expect(error).toBeInstanceOf(SerieNotFound)
    }
  })
})
