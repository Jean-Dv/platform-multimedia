import { ChapterCreator } from '@Multimedia/Chapter/application/Create/ChapterCreator'
import { ChapterRepositoryMock } from '../../__mocks__/ChapterRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateChapterCommandHandler } from '@Multimedia/Chapter/application/Create/CreateChapterCommandHandler'
import { CreateChapterCommandMother } from './CreateChapterCommandMother'
import { SeasonMother } from '../../../Season/domain/SeasonMother'
import { ChapterCreatedDomainEventMother } from '../../domain/ChapterCreatedDomainEventMother'
import { ChapterMother } from '../../domain/ChapterMother'
import { ChapterTitleLengthExceeded } from '@Multimedia/Chapter/domain/ChapterTitleLengthExceeded'

let repository: ChapterRepositoryMock
let creator: ChapterCreator
let eventBus: EventBusMock
let handler: CreateChapterCommandHandler

beforeEach(() => {
  repository = new ChapterRepositoryMock()
  eventBus = new EventBusMock()
  creator = new ChapterCreator(repository, eventBus)
  handler = new CreateChapterCommandHandler(creator)
})

describe('CreateChapterCommandHandler', () => {
  it('should create a valid chapter', async () => {
    const season = SeasonMother.random()
    const command = CreateChapterCommandMother.random(season.id)
    const chapter = ChapterMother.from(command)
    const domainEvent = ChapterCreatedDomainEventMother.fromChapter(chapter)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(chapter)
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
})
