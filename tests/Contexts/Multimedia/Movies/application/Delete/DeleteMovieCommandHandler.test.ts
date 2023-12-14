import { MovieDeletor } from '@Multimedia/Movies/application/Delete/MovieDeletor'
import { MovieRepositoryMock } from '../../__mocks__/MovieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteMovieCommandHandler } from '@Multimedia/Movies/application/Delete/DeleteMovieCommandHandler'
import { MovieMother } from '../../domain/MovieMother'
import { DeleteMovieCommandMother } from './DeleteMovieCommandMother'
import { MovieDeletedDomainEventMother } from '../../domain/MovieDeletedDomainEventMother'
import { MovieNotFound } from '@Multimedia/Movies/domain/MovieNotFound'

let repository: MovieRepositoryMock
let deletor: MovieDeletor
let eventBus: EventBusMock
let handler: DeleteMovieCommandHandler

beforeEach(() => {
  repository = new MovieRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new MovieDeletor(repository, eventBus)
  handler = new DeleteMovieCommandHandler(deletor)
})

describe('DeleteMovieCommandHandler', () => {
  it('should delete a valid movie', async () => {
    const movies = [
      MovieMother.random(),
      MovieMother.random(),
      MovieMother.random()
    ]
    repository.searchMockReturnValue(movies[0])

    const command = DeleteMovieCommandMother.create(movies[0].id)
    const domainEvent = MovieDeletedDomainEventMother.fromMovie(movies[0])

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(movies[0].id)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when movie does not exist', async () => {
    try {
      const command = DeleteMovieCommandMother.random()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(MovieNotFound)
    }
  })
})
