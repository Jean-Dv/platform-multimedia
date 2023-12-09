import { SerieCreator } from '@Multimedia/Serie/application/Create/SerieCreator'
import { SerieRepositoryMock } from '../../__mocks__/SerieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreateSerieCommandHandler } from '@Multimedia/Serie/application/Create/CreateSerieCommandHandler'
import { CreateSerieCommandMother } from './CreateSerieCommandMother'
import { SerieMother } from '../../domain/SerieMother'
import { SerieCreatedDomainEventMother } from '../../domain/SerieCreatedDomainEventMother'
import { SerieTitleLengthExceeded } from '@Multimedia/Serie/domain/SerieTitleLengthExceeded'
import { CategoryRepositoryMock } from '../../../Categories/__mocks__/CategoryRepositoryMock'
import { CategoryMother } from '../../../Categories/domain/CategoryMother'

let repository: SerieRepositoryMock
let repositoryCategory: CategoryRepositoryMock
let creator: SerieCreator
let eventBus: EventBusMock
let handler: CreateSerieCommandHandler

beforeEach(() => {
  repository = new SerieRepositoryMock()
  repositoryCategory = new CategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new SerieCreator(repository, repositoryCategory, eventBus)
  handler = new CreateSerieCommandHandler(creator)
})

describe('CreateSerieCommandHandler', () => {
  it('should create a valid serie', async () => {
    const category = CategoryMother.random()
    repositoryCategory.searchByNameMockReturnValue(category)

    const command = CreateSerieCommandMother.randomWithCategory(category.name)
    const serie = SerieMother.from(command)
    const domainEvent = SerieCreatedDomainEventMother.fromSerie(serie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(serie)
    repositoryCategory.assertSearchByNameHaveBeenCalledWith(category.name)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const category = CategoryMother.random()
      repositoryCategory.searchByNameMockReturnValue(category)
      const command = CreateSerieCommandMother.invalidWithCategory(
        category.name
      )
      const serie = SerieMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(serie)
    } catch (error) {
      expect(error).toBeInstanceOf(SerieTitleLengthExceeded)
    }
  })
})
