import { BackofficeMultimediaSerieMother } from './../../../Series/domain/BackofficeMultimediaSerieMother'
import { BackofficeMultimediaSerieRepositoryMock } from './../../../Series/__mocks__/BackofficeMultimediaSerieRepositoryMock'
import { BackofficeMultimediaSeasonRepositoryMock } from '../../__mocks__/BackofficeMultimediaSeasonRepositoryMock'
import { type BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSeasonCreator } from '@BackofficeMultimedia/Seasons/application/Create/BackofficeMultimediaSeasonCreator'
import { BackofficeMultimediaSerieFinder } from '@BackofficeMultimedia/Series/application/Find/BackofficeMultimediaSerieFinder'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaSeasonCommandHandler } from '@BackofficeMultimedia/Seasons/application/Create/CreateBackofficeMultimediaSeasonCommandHandler'
import { CreateBackofficeMultimediaSeasonCommandMother } from './CreateBackofficeMultimediaSeasonCommandMother'
import { BackofficeMultimediaSeasonMother } from '../../domain/BackofficeMultimediaSeasonMother'
import { BackofficeMultimediaSeasonCreatedDomainEventMother } from '../../domain/BackofficeMultimediaSeasonCreatedDomainEventMother'
import { BackofficeMultimediaSeasonTitleLengthIsExceeded } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitleLengthIsExceeded'
import { BackofficeMultimediaSeasonReleaseYearIsNegative } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYearIsNegative'

let repository: BackofficeMultimediaSeasonRepositoryMock
let repositorySerie: BackofficeMultimediaSerieRepositoryMock
let series: BackofficeMultimediaSerie[]
let creator: BackofficeMultimediaSeasonCreator
let finderSerie: BackofficeMultimediaSerieFinder
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaSeasonCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaSeasonRepositoryMock()
  repositorySerie = new BackofficeMultimediaSerieRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaSeasonCreator(repository, eventBus)
  finderSerie = new BackofficeMultimediaSerieFinder(repositorySerie)
  handler = new CreateBackofficeMultimediaSeasonCommandHandler(
    creator,
    finderSerie
  )

  // Setup mock of categories
  series = [BackofficeMultimediaSerieMother.random()]
  repositorySerie.searchMockReturnValue(series)
  CreateBackofficeMultimediaSeasonCommandMother.serie = series[0].id
})

describe('CreateBackofficeMultimediaMovieCommandHandler', () => {
  it('should create a valid movie', async () => {
    const command = CreateBackofficeMultimediaSeasonCommandMother.random()
    const season = BackofficeMultimediaSeasonMother.from(command)
    const domainEvent =
      BackofficeMultimediaSeasonCreatedDomainEventMother.from(season)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(season)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when title is invalid for length is exceeded', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSeasonCommandMother.invalidTitle()
      const movie = BackofficeMultimediaSeasonMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaSeasonTitleLengthIsExceeded
      )
    }
  })

  it('should throw an error when release year is invalid for is negative', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSeasonCommandMother.invalidReleaseYear()
      const movie = BackofficeMultimediaSeasonMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaSeasonReleaseYearIsNegative
      )
    }
  })

  it('should throw an error when category is invalid for not exists', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSeasonCommandMother.invalidCategory()
      const movie = BackofficeMultimediaSeasonMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
