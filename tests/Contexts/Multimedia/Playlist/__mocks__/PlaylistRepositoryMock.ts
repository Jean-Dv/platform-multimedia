import { type Playlist } from '@Multimedia/Playlists/domain/Playlist'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { type PlaylistRepository } from '@Multimedia/Playlists/domain/PlaylistRepository'

export class PlaylistRepositoryMock implements PlaylistRepository {
  private readonly saveMock: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly playlists: Playlist[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchMock = jest.fn()
    this.deleteMock = jest.fn()
  }

  public async save(playlist: Playlist): Promise<void> {
    this.saveMock(playlist)
  }

  public async search(id: PlaylistId): Promise<Playlist | null> {
    this.searchMock(id)
    return (
      this.playlists.find((playlist) => playlist.id.value === id.value) ?? null
    )
  }

  public async delete(id: PlaylistId): Promise<void> {
    this.deleteMock(id)
  }

  public assertSearchHaveBeenCalledWith(id: PlaylistId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id)
  }

  public assertDeleteHaveBeenCalledWith(id: PlaylistId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id)
  }

  public assertSaveHaveBeenCalledWith(playlist: Playlist): void {
    expect(this.saveMock).toHaveBeenCalledWith(playlist)
  }

  public searchMockReturnValue(playlist: Playlist): void {
    this.playlists.push(playlist)
  }

  public searchMockReturnValues(playlists: Playlist[]): void {
    this.playlists.push(...playlists)
  }
}
