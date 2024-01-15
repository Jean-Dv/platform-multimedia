import { BackofficeMultimediaMovieCreator } from '@BackofficeMultimedia/Movies/application/Create/BackofficeMultimediaMovieCreator'
import { BackofficeMultimediaMovieRepositoryMock } from '../../__mocks__/BackofficeMultimediaMovieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaMovieCommandHandler } from '@BackofficeMultimedia/Movies/application/Create/CreateBackofficeMultimediaMovieCommandHandler'
import { CreateBackofficeMultimediaMovieCommandMother } from './CreateBackofficeMultimediaMovieCommandMother'
import { BackofficeMultimediaMovieMother } from '../../domain/BackofficeMultimediaMovieMother'
import { BackofficeMultimediaMovieCreatedDomainEventMother } from '../../domain/BackofficeMultimediaMovieCreatedDomainEventMother'
import { BackofficeMultimediaMovieTitleLengthIsExceeded } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitleLengthIsExceeded'
import { BackofficeMultimediaMovieReleaseYearIsNegative } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYearIsNegative'

let repository: BackofficeMultimediaMovieRepositoryMock
let creator: BackofficeMultimediaMovieCreator
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaMovieCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaMovieRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaMovieCreator(repository, eventBus)
  handler = new CreateBackofficeMultimediaMovieCommandHandler(creator)
})

describe('CreateBackofficeMultimediaMovieCommandHandler', () => {
  it('should create a valid movie', async () => {
    const command = CreateBackofficeMultimediaMovieCommandMother.random()
    const movie = BackofficeMultimediaMovieMother.from(command)
    const domainEvent =
      BackofficeMultimediaMovieCreatedDomainEventMother.from(movie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(movie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when title is invalid for length is exceeded', async () => {
    try {
      const command =
        CreateBackofficeMultimediaMovieCommandMother.invalidTitle()
      const movie = BackofficeMultimediaMovieMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaMovieTitleLengthIsExceeded
      )
    }
  })

  it('should throw an error when release year is invalid for is negative', async () => {
    try {
      const command =
        CreateBackofficeMultimediaMovieCommandMother.invalidReleaseYear()
      const movie = BackofficeMultimediaMovieMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaMovieReleaseYearIsNegative
      )
    }
  })
})
