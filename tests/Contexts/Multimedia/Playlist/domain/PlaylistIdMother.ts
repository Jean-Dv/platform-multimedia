import { PlaylistId } from '@Multimedia/Playlists/domain/PlaylistId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class PlaylistIdMother {
  public static create(value: string): PlaylistId {
    return new PlaylistId(value)
  }

  public static random(): PlaylistId {
    return this.create(UuidMother.random())
  }
}
