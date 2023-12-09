import { PlaylistDeletor } from '@Multimedia/Playlists/application/Delete/PlaylistDeletor'
import { PlaylistRepositoryMock } from '../../__mocks__/PlaylistRepositoryMock'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { DeletePlaylistCommandHandler } from '@Multimedia/Playlists/application/Delete/DeletePlaylistCommandHandler'
import { DeletePlaylistCommandMother } from './DeletePlaylistCommandMother'
import { PlaylistMother } from '../../domain/PlaylistMother'
import { PlaylistDeletedDomainEventMother } from '../../domain/PlaylistDeletedDomainEvent'
import { PlaylistNotFound } from '@Multimedia/Playlists/domain/PlaylistNotFound'

let repository: PlaylistRepositoryMock
let deletor: PlaylistDeletor
let eventBus: EventBusMock
let handler: DeletePlaylistCommandHandler

beforeEach(() => {
  repository = new PlaylistRepositoryMock()
  eventBus = new EventBusMock()
  deletor = new PlaylistDeletor(repository, eventBus)
  handler = new DeletePlaylistCommandHandler(deletor)
})

describe('DeletePlaylistCommandHandler', () => {
  it('should delete a valid playlist', async () => {
    const playlists = [
      PlaylistMother.random(),
      PlaylistMother.random(),
      PlaylistMother.random()
    ]
    repository.searchMockReturnValue(playlists[0])

    const command = DeletePlaylistCommandMother.create(playlists[0].id)
    const domainEvent = PlaylistDeletedDomainEventMother.fromPlaylist(
      playlists[0]
    )

    await handler.handle(command)

    repository.assertDeleteHaveBeenCalledWith(playlists[0].id)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when playlist does not exist', async () => {
    try {
      const command = DeletePlaylistCommandMother.random()
      await handler.handle(command)
    } catch (error) {
      expect(error).toBeInstanceOf(PlaylistNotFound)
    }
  })
})
