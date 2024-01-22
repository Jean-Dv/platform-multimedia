import { BackofficeMultimediaSeasonMother } from './../../../Seasons/domain/BackofficeMultimediaSeasonMother'
import { BackofficeMultimediaSeasonRepositoryMock } from './../../../Seasons/__mocks__/BackofficeMultimediaSeasonRepositoryMock'
import { BackofficeMultimediaChapterRepositoryMock } from '../../__mocks__/BackofficeMultimediaChapterRepositoryMock'
import { type BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaChapterCreator } from '@BackofficeMultimedia/Chapters/application/Create/BackofficeMultimediaChapterCreator'
import { BackofficeMultimediaSeasonFinder } from '@BackofficeMultimedia/Seasons/application/Find/BackofficeMultimediaSeasonFinder'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaChapterCommandHandler } from '@BackofficeMultimedia/Chapters/application/Create/CreateBackofficeMultimediaChapterCommandHandler'
import { CreateBackofficeMultimediaChapterCommandMother } from './CreateBackofficeMultimediaChapterCommandMother'
import { BackofficeMultimediaChapterMother } from '../../domain/BackofficeMultimediaChapterMother'
import { BackofficeMultimediaChapterCreatedDomainEventMother } from '../../domain/BackofficeMultimediaChapterCreatedDomainEventMother'
import { BackofficeMultimediaChapterTitleLengthIsExceeded } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterTitleLengthIsExceeded'
import { BackofficeMultimediaSeasonNotFound } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonNotFound'
import { BackofficeMultimediaChapterReleaseYearIsNegative } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterReleaseYearIsNegative'

let repository: BackofficeMultimediaChapterRepositoryMock
let repositorySeason: BackofficeMultimediaSeasonRepositoryMock
let season: BackofficeMultimediaSeason[]
let creator: BackofficeMultimediaChapterCreator
let finderSeason: BackofficeMultimediaSeasonFinder
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaChapterCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaChapterRepositoryMock()
  repositorySeason = new BackofficeMultimediaSeasonRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaChapterCreator(repository, eventBus)
  finderSeason = new BackofficeMultimediaSeasonFinder(repositorySeason)
  handler = new CreateBackofficeMultimediaChapterCommandHandler(
    creator,
    finderSeason
  )

  // Setup mock of categories
  season = [BackofficeMultimediaSeasonMother.random()]
  repositorySeason.searchMockReturnValue(season)
  CreateBackofficeMultimediaChapterCommandMother.season = season[0].id
})

describe('CreateBackofficeMultimediaChapterCommandHandler', () => {
  it('should create a valid chapter', async () => {
    const command = CreateBackofficeMultimediaChapterCommandMother.random()
    const chapter = BackofficeMultimediaChapterMother.from(command)
    const domainEvent =
      BackofficeMultimediaChapterCreatedDomainEventMother.from(chapter)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(chapter)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when title is invalid for length is exceeded', async () => {
    try {
      const command =
        CreateBackofficeMultimediaChapterCommandMother.invalidTitle()
      const chapter = BackofficeMultimediaChapterMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(chapter)
    } catch (e) {
      expect(e).toBeInstanceOf(BackofficeMultimediaChapterTitleLengthIsExceeded)
    }
  })

  it('should throw an error when release year is invalid for negative', async () => {
    try {
      const command =
        CreateBackofficeMultimediaChapterCommandMother.invalidReleaseYear()
      const chapter = BackofficeMultimediaChapterMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(chapter)
    } catch (e) {
      expect(e).toBeInstanceOf(BackofficeMultimediaChapterReleaseYearIsNegative)
    }
  })

  it('should throw an error when season is invalid for not exists', async () => {
    try {
      const command =
        CreateBackofficeMultimediaChapterCommandMother.invalidSeason()
      const chapter = BackofficeMultimediaChapterMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(chapter)
    } catch (e) {
      expect(e).toBeInstanceOf(BackofficeMultimediaSeasonNotFound)
    }
  })
})
