import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'

export class PlaylistRepositoryMock implements PlaylistRepository {
  private readonly saveMock: jest.Mock

  constructor() {
    this.saveMock = jest.fn()
  }

  public async save(playlist: Playlist): Promise<void> {
    this.saveMock(playlist)
  }

  public assertSaveHaveBeenCalledWith(playlist: Playlist): void {
    expect(this.saveMock).toHaveBeenCalledWith(playlist)
  }
}
