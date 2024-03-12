import { BackofficeMultimediaSeasonDeletor } from '@BackofficeMultimedia/Seasons/application/Delete/BackofficeMultimediaSeasonDeletor'
import { BackofficeMultimediaSeasonRepositoryMock } from '../../__mocks__/BackofficeMultimediaSeasonRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteBackofficeMultimediaSeasonCommandHandler } from '@BackofficeMultimedia/Seasons/application/Delete/DeleteBackofficeMultimediaSeasonCommandHandler'
import { BackofficeMultimediaSeasonMother } from '../../domain/BackofficeMultimediaSeasonMother'
import { DeleteBackofficeMultimediaSeasonCommandMother } from './DeleteBackofficeMultimediaSeasonCommandMother'
import { BackofficeMultimediaSeasonDeletedDomainEventMother } from '../../domain/BackofficeMultimediaSeasonDeletedDomainEventMother'
import { BackofficeMultimediaSeasonNotFound } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonNotFound'

let repository: BackofficeMultimediaSeasonRepositoryMock
let deletor: BackofficeMultimediaSeasonDeletor
let eventBus: EventBusMock
let handler: DeleteBackofficeMultimediaSeasonCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaSeasonRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new BackofficeMultimediaSeasonDeletor(repository, eventBus)
  handler = new DeleteBackofficeMultimediaSeasonCommandHandler(deletor)
})

describe('DeleteBackofficeMultimediaSeasonCommandHandler', () => {
  it('should delete a valid season', async () => {
    const season = BackofficeMultimediaSeasonMother.random()
    repository.searchMockReturnValue([season])

    const command = DeleteBackofficeMultimediaSeasonCommandMother.create(
      season.id
    )
    const domainEvent =
      BackofficeMultimediaSeasonDeletedDomainEventMother.from(season)

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(season)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when season does not exist', async () => {
    try {
      const command = DeleteBackofficeMultimediaSeasonCommandMother.invalid()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(BackofficeMultimediaSeasonNotFound)
    }
  })
})
