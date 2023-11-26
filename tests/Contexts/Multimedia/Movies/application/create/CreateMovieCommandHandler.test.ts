import { CreateMovieCommandHander } from '@Multimedia/Movies/application/create/CreateMovieCommandHandler'
import { MovieCreator } from '@Multimedia/Movies/application/create/MovieCreator'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import { MovieCreatedDomainEventMother } from '../../domain/MovieCreatedDomainEventMother'
import { MovieMother } from '../../domain/MovieMother'
import { CreateMovieCommandMother } from './CreateMovieCommandMother'
import { MovieTitleLengthExceeded } from '@Multimedia/Movies/domain/MovieTitleLengthExceeded'

let repository: MovieRepositoryMock
let creator: MovieCreator
let eventBus: EventBusMock
let handler: CreateMovieCommandHander

beforeEach(() => {
  repository = new MovieRepositoryMock()
  eventBus = new EventBusMock()
  creator = new MovieCreator(repository, eventBus)
  handler = new CreateMovieCommandHander(creator)
})

describe('CreateMovieCommandHandler', () => {
  it('should create a valid movie', async () => {
    const command = CreateMovieCommandMother.random()
    const movie = MovieMother.from(command)
    const domainEvent = MovieCreatedDomainEventMother.fromMovie(movie)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(movie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreateMovieCommandMother.invalid()
      const movie = MovieMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(movie)
    } catch (error) {
      expect(error).toBeInstanceOf(MovieTitleLengthExceeded)
    }
  })
})
