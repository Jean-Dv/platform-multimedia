import { PlaylistCreator } from '@Multimedia/Playlists/application/Create/PlaylistCreator'
import { PlaylistRepositoryMock } from '../../__mocks__/PlaylistRepositoryMock'
import { CreatePlaylistCommandHandler } from '@Multimedia/Playlists/application/Create/CreatePlaylistCommandHandler'
import EventBusMock from '../../../../Shared/domain/EventBusMock'
import { CreatePlaylistCommandMother } from './CreatePlaylistCommandMother'
import { PlaylistMother } from '../../domain/PlaylistMother'
import { PlaylistCreatedDomainEventMother } from '../../domain/PlaylistCreatedDomainEventMother'
import { PlaylistNameLengthExceeded } from '@Multimedia/Playlists/domain/PlaylistNameLengthExceeded'

let repository: PlaylistRepositoryMock
let creator: PlaylistCreator
let eventBus: EventBusMock
let handler: CreatePlaylistCommandHandler

beforeEach(() => {
  repository = new PlaylistRepositoryMock()
  eventBus = new EventBusMock()
  creator = new PlaylistCreator(repository, eventBus)
  handler = new CreatePlaylistCommandHandler(creator)
})

describe('CreatePlaylistCommandHandler', () => {
  it('should create a valid playlist', async () => {
    const command = CreatePlaylistCommandMother.random()
    const playlist = PlaylistMother.from(command)
    const domainEvent = PlaylistCreatedDomainEventMother.fromPlaylist(playlist)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(playlist)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw an error when name is invalid', async () => {
    try {
      const command = CreatePlaylistCommandMother.invalid()
      const playlist = PlaylistMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(playlist)
    } catch (error) {
      expect(error).toBeInstanceOf(PlaylistNameLengthExceeded)
    }
  })
})
