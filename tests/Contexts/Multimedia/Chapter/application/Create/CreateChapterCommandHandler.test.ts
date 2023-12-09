import { ChapterCreator } from '@Multimedia/Chapter/application/Create/ChapterCreator'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateChapterCommandHandler } from '@Multimedia/Chapter/application/Create/CreateChapterCommandHandler'
import { CreateChapterCommandMother } from './CreateChapterCommandMother'
import { SeasonMother } from '../../../Season/domain/SeasonMother'
import { ChapterCreatedDomainEventMother } from '../../domain/ChapterCreatedDomainEventMother'
import { ChapterMother } from '../../domain/ChapterMother'
import { ChapterTitleLengthExceeded } from '@Multimedia/Chapter/domain/ChapterTitleLengthExceeded'
import QueryBusMock from '../../../../Shared/infrastructure/QueryBus/__mocks__/QueryBusMock'
import { SearchSeasonByIdQuery } from '@Multimedia/Season/application/SearchById/SearchSeasonByIdQuery'
import { SearchSeasonByIdResponseMother } from '../../../Season/application/SearchById/SearchSeasonByIdResponseMother'
import { SeasonNotFound } from '@Multimedia/Season/domain/SeasonNotFound'

let repository: ChapterRepositoryMock
let creator: ChapterCreator
let eventBus: EventBusMock
let queryBus: QueryBusMock
let handler: CreateChapterCommandHandler

beforeEach(() => {
  repository = new ChapterRepositoryMock()
  eventBus = new EventBusMock()
  queryBus = new QueryBusMock()
  creator = new ChapterCreator(repository, queryBus, eventBus)
  handler = new CreateChapterCommandHandler(creator)
})

describe('CreateChapterCommandHandler', () => {
  it('should create a valid chapter', async () => {
    const season = SeasonMother.random()
    const query = new SearchSeasonByIdQuery(season.id.value)
    const response = SearchSeasonByIdResponseMother.create(season)
    queryBus.askMockReturnValue(response)

    const command = CreateChapterCommandMother.randomWithSeason(season.id)
    const chapter = ChapterMother.from(command)
    const domainEvent = ChapterCreatedDomainEventMother.fromChapter(chapter)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(chapter)
    queryBus.assertAskSpyHaveBeenCalledWith(query)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const season = SeasonMother.random()
      const command = CreateChapterCommandMother.invalid(season.id)
      const chapter = ChapterMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(chapter)
    } catch (error) {
      expect(error).toBeInstanceOf(ChapterTitleLengthExceeded)
    }
  })

  it('should throw an error when season does not exist', async () => {
    try {
      const season = SeasonMother.random()
      const response = SearchSeasonByIdResponseMother.invalid(season)
      queryBus.askMockReturnValue(response)

      const command = CreateChapterCommandMother.random()
      const chapter = ChapterMother.from(command)

      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(chapter)
    } catch (error) {
      expect(error).toBeInstanceOf(SeasonNotFound)
    }
  })
})
