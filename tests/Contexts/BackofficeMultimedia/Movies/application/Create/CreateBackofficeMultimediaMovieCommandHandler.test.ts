import { BackofficeMultimediaCategoryMother } from './../../../Categories/domain/BackofficeMultimediaCategoryMother'
import { BackofficeMultimediaCategoryRepositoryMock } from './../../../Categories/__mocks__/BackofficeMultimediaCategoryRepositoryMock'
import { BackofficeMultimediaMovieRepositoryMock } from './../../__mocks__/BackofficeMultimediaMovieRepositoryMock'
import { BackofficeMultimediaMovieCreator } from '@BackofficeMultimedia/Movies/application/Create/BackofficeMultimediaMovieCreator'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaMovieCommandHandler } from '@BackofficeMultimedia/Movies/application/Create/CreateBackofficeMultimediaMovieCommandHandler'
import { CreateBackofficeMultimediaMovieCommandMother } from './CreateBackofficeMultimediaMovieCommandMother'
import { BackofficeMultimediaMovieMother } from '../../domain/BackofficeMultimediaMovieMother'
import { BackofficeMultimediaMovieCreatedDomainEventMother } from '../../domain/BackofficeMultimediaMovieCreatedDomainEventMother'
import { BackofficeMultimediaMovieTitleLengthIsExceeded } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitleLengthIsExceeded'
import { BackofficeMultimediaMovieReleaseYearIsNegative } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYearIsNegative'
import { BackofficeMultimediaCategoryFinder } from '@BackofficeMultimedia/Categories/application/Find/BackofficeMultimediaCategoryFinder'
import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'

let repository: BackofficeMultimediaMovieRepositoryMock
let repositoryCategory: BackofficeMultimediaCategoryRepositoryMock
let categories: BackofficeMultimediaCategory[]
let creator: BackofficeMultimediaMovieCreator
let finderCategory: BackofficeMultimediaCategoryFinder
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaMovieCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaMovieRepositoryMock()
  repositoryCategory = new BackofficeMultimediaCategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaMovieCreator(repository, eventBus)
  finderCategory = new BackofficeMultimediaCategoryFinder(repositoryCategory)
  handler = new CreateBackofficeMultimediaMovieCommandHandler(
    creator,
    finderCategory
  )

  // Setup mock of categories
  categories = [
    BackofficeMultimediaCategoryMother.random(),
    BackofficeMultimediaCategoryMother.random(),
    BackofficeMultimediaCategoryMother.random()
  ]
  repositoryCategory.searchMockReturnValue(categories)
})

describe('CreateBackofficeMultimediaMovieCommandHandler', () => {
  it('should create a valid movie', async () => {
    const command =
      CreateBackofficeMultimediaMovieCommandMother.random(categories)
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

  it('should throw an error when category is invalid for not exists', async () => {
    try {
      const command =
        CreateBackofficeMultimediaMovieCommandMother.invalidCategory()
      const movie = BackofficeMultimediaMovieMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
