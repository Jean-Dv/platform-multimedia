import { type DeletePlaylistCommand } from '@Multimedia/Playlists/application/Delete/DeletePlaylistCommand'
import { type PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { PlaylistIdMother } from '../../domain/PlaylistIdMother'

export class DeletePlaylistCommandMother {
  public static create(id: PlaylistId): DeletePlaylistCommand {
    return {
      id: id.value
    }
  }

  public static random(): DeletePlaylistCommand {
    return this.create(PlaylistIdMother.random())
  }
}
