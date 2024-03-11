import { BackofficeMultimediaChapterDeletor } from '@BackofficeMultimedia/Chapters/application/Delete/BackofficeMultimediaChapterDeletor'
import { BackofficeMultimediaChapterRepositoryMock } from '../../__mocks__/BackofficeMultimediaChapterRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeleteBackofficeMultimediaChapterCommandHandler } from '@BackofficeMultimedia/Chapters/application/Delete/DeleteBackofficeMultimediaChapterCommandHandler'
import { DeleteBackofficeMultimediaChapterCommandMother } from './DeleteBackofficeMultimediaChapterCommandMother'
import { BackofficeMultimediaChapterMother } from '../../domain/BackofficeMultimediaChapterMother'
import { BackofficeMultimediaChapterDeletedDomainEventMother } from '../../domain/BackofficeMultimediaChapterDeletedDomainEventMother'

let repository: BackofficeMultimediaChapterRepositoryMock
let deletor: BackofficeMultimediaChapterDeletor
let eventBus: EventBusMock
let handler: DeleteBackofficeMultimediaChapterCommandHandler

beforeEach(() => {
  repository = new BackofficeMultimediaChapterRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new BackofficeMultimediaChapterDeletor(repository, eventBus)
  handler = new DeleteBackofficeMultimediaChapterCommandHandler(deletor)
})

describe('DeleteBackofficeMultimediaChapterCommandHandler', () => {
  it('should delete a valid chapter', async () => {
    const chapter = BackofficeMultimediaChapterMother.random()
    repository.setChapters([chapter])

    const command = DeleteBackofficeMultimediaChapterCommandMother.create(
      chapter.id
    )
    const domainEvent =
      BackofficeMultimediaChapterDeletedDomainEventMother.from(chapter)

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(chapter)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when chapter does not exist', async () => {
    try {
      const command = { id: 'invalid-id' }
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
