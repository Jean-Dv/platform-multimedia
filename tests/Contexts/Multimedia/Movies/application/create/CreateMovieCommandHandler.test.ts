import { CreateMovieCommandHandler } from '@Multimedia/Movies/application/Create/CreateMovieCommandHandler'
import { MovieCreator } from '@Multimedia/Movies/application/Create/MovieCreator'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieCreatedDomainEventMother } from '../../domain/MovieCreatedDomainEventMother'
import { MovieMother } from '../../domain/MovieMother'
import { CreateMovieCommandMother } from './CreateMovieCommandMother'
import { CategoryRepositoryMock } from '../../../Categories/__mocks__/CategoryRepositoryMock'
import { CategoryMother } from '../../../Categories/domain/CategoryMother'

let repository: MovieRepositoryMock
let categoryRepository: CategoryRepositoryMock
let creator: MovieCreator
let eventBus: EventBusMock
let handler: CreateMovieCommandHandler

beforeEach(() => {
  repository = new MovieRepositoryMock()
  categoryRepository = new CategoryRepositoryMock()
  eventBus = new EventBusMock()
  creator = new MovieCreator(repository, categoryRepository, eventBus)
  handler = new CreateMovieCommandHandler(creator)
})

describe('CreateMovieCommandHandler', () => {
  it('should create a valid movie', async () => {
    const category = CategoryMother.random()
    categoryRepository.searchByNameMockReturnValue(category)
    const command = CreateMovieCommandMother.randomWithCategory(category.name)
    const movie = MovieMother.from(command)
    const domainEvent = MovieCreatedDomainEventMother.fromMovie(movie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(movie)
    categoryRepository.assertSearchByNameHaveBeenCalledWith(category.name)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })
})
