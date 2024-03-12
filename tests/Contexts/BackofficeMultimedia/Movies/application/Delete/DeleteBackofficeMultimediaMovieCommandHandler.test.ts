import { BackofficeMultimediaMovieDeletor } from '@BackofficeMultimedia/Movies/application/Delete/BackofficeMultimediaMovieDeletor'
import { BackofficeMultimediaMovieRepositoryMock } from '../../__mocks__/BackofficeMultimediaMovieRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteBackofficeMultimediaMovieCommandHandler } from '@BackofficeMultimedia/Movies/application/Delete/DeleteBackofficeMultimediaMovieCommandHandler'
import { BackofficeMultimediaMovieMother } from '../../domain/BackofficeMultimediaMovieMother'
import { DeleteBackofficeMultimediaMovieCommandMother } from './DeleteBackofficeMultimediaMovieCommandMother'
import { BackofficeMultimediaMovieDeletedDomainEventMother } from '../../domain/BackofficeMultimediaMovieDeletedDomainEventMother'
import { BackofficeMultimediaMovieNotFound } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieNotFound'

let repository: BackofficeMultimediaMovieRepositoryMock
let deletor: BackofficeMultimediaMovieDeletor
let eventBus: EventBusMock
let handler: DeleteBackofficeMultimediaMovieCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaMovieRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new BackofficeMultimediaMovieDeletor(repository, eventBus)
  handler = new DeleteBackofficeMultimediaMovieCommandHandler(deletor)
})

describe('DeleteBackofficeMultimediaMovieCommandHandler', () => {
  it('should delete a valid movie', async () => {
    const movie = BackofficeMultimediaMovieMother.random()
    repository.setMovies([movie])

    const command = DeleteBackofficeMultimediaMovieCommandMother.create(
      movie.id
    )
    const domainEvent =
      BackofficeMultimediaMovieDeletedDomainEventMother.from(movie)

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(movie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when movie does not exist', async () => {
    try {
      const command = DeleteBackofficeMultimediaMovieCommandMother.invalid()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficeMultimediaMovieNotFound)
    }
  })
})
