import { BackofficeMultimediaSerieDeletor } from '@BackofficeMultimedia/Series/application/Delete/BackofficeMultimediaSerieDeletor'
import { BackofficeMultimediaSerieRepositoryMock } from '../../__mocks__/BackofficeMultimediaSerieRepositoryMock'
import { DeleteBackofficeMultimediaSerieCommandHandler } from '@BackofficeMultimedia/Series/application/Delete/DeleteBackofficeMultimediaSerieCommandHandler'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { BackofficeMultimediaSerieMother } from '../../domain/BackofficeMultimediaSerieMother'
import { DeleteBackofficeMultimediaSerieCommandMother } from './DeleteBackofficeMultimediaSerieCommandMother'
import { BackofficeMultimediaSerieDeletedDomainEventMother } from '../../domain/BackofficeMultimediaSerieDeletedDomainEventMother'
import { BackofficeMultimediaSerieNotFound } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieNotFound'

let repository: BackofficeMultimediaSerieRepositoryMock
let deletor: BackofficeMultimediaSerieDeletor
let eventBus: EventBusMock
let handler: DeleteBackofficeMultimediaSerieCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaSerieRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new BackofficeMultimediaSerieDeletor(repository, eventBus)
  handler = new DeleteBackofficeMultimediaSerieCommandHandler(deletor)
})

describe('DeleteBackofficeMultimediaSerieCommandHandler', () => {
  it('should delete a valid serie', async () => {
    const serie = BackofficeMultimediaSerieMother.random()
    repository.searchMockReturnValue([serie])

    const command = DeleteBackofficeMultimediaSerieCommandMother.create(
      serie.id
    )
    const domainEvent =
      BackofficeMultimediaSerieDeletedDomainEventMother.from(serie)

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(serie)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when serie does not exist', async () => {
    try {
      const command = DeleteBackofficeMultimediaSerieCommandMother.invalid()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficeMultimediaSerieNotFound)
    }
  })
})
