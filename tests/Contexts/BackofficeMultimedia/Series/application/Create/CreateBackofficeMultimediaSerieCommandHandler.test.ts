import { BackofficeMultimediaCategoryMother } from './../../../Categories/domain/BackofficeMultimediaCategoryMother'
import { BackofficeMultimediaCategoryRepositoryMock } from './../../../Categories/__mocks__/BackofficeMultimediaCategoryRepositoryMock'
import { BackofficeMultimediaSerieRepositoryMock } from '../../__mocks__/BackofficeMultimediaSerieRepositoryMock'
import { type BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { BackofficeMultimediaSerieCreator } from '@BackofficeMultimedia/Series/application/Create/BackofficeMultimediaSerieCreator'
import { BackofficeMultimediaCategoryFinder } from '@BackofficeMultimedia/Categories/application/Find/BackofficeMultimediaCategoryFinder'
import { CreateBackofficeMultimediaSerieCommandHandler } from '@BackofficeMultimedia/Series/application/Create/CreateBackofficeMultimediaSerieCommandHandler'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateBackofficeMultimediaSerieCommandMother } from './CreateBackofficeMultimediaSerieCommandMother'
import { BackofficeMultimediaSerieMother } from '../../domain/BackofficeMultimediaSerieMother'
import { BackofficeMultimediaSerieCreatedDomainEventMother } from '../../domain/BackofficeMultimediaSerieCreatedDomainEventMother'
import { BackofficeMultimediaSerieTitleLengthIsExceeded } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitleLengthIsExceeded'
import { BackofficeMultimediaSerieReleaseYearIsNegative } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYearIsNegative'
import { BackofficeMultimediaCategoryNotFound } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryNotFound'

let repository: BackofficeMultimediaSerieRepositoryMock
let repositoryCategory: BackofficeMultimediaCategoryRepositoryMock
let categories: BackofficeMultimediaCategory[]
let creator: BackofficeMultimediaSerieCreator
let finderCategory: BackofficeMultimediaCategoryFinder
let eventBus: EventBusMock
let handler: CreateBackofficeMultimediaSerieCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaSerieRepositoryMock()
  repositoryCategory = new BackofficeMultimediaCategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new BackofficeMultimediaSerieCreator(repository, eventBus)
  finderCategory = new BackofficeMultimediaCategoryFinder(repositoryCategory)
  handler = new CreateBackofficeMultimediaSerieCommandHandler(
    creator,
    finderCategory
  )

  categories = [
    BackofficeMultimediaCategoryMother.random(),
    BackofficeMultimediaCategoryMother.random(),
    BackofficeMultimediaCategoryMother.random()
  ]
  repositoryCategory.searchMockReturnValue(categories)
  CreateBackofficeMultimediaSerieCommandMother.categories = categories
})

describe('CreateBackofficeMultimediaSerieCommandHandler', () => {
  it('should create a valid serie', async () => {
    const command = CreateBackofficeMultimediaSerieCommandMother.random()
    const serie = BackofficeMultimediaSerieMother.from(command)
    const domainEvent =
      BackofficeMultimediaSerieCreatedDomainEventMother.from(serie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(serie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when title is invalid for length is exceeded', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSerieCommandMother.invalidTitle()

      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaSerieTitleLengthIsExceeded
      )
    }
  })

  it('should throw an error when release year is invalid for is negative', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSerieCommandMother.invalidReleaseYear()

      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(
        BackofficeMultimediaSerieReleaseYearIsNegative
      )
    }
  })

  it('should throw an error when category is invalid for not exist', async () => {
    try {
      const command =
        CreateBackofficeMultimediaSerieCommandMother.invalidCategory()

      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficeMultimediaCategoryNotFound)
    }
  })
})
