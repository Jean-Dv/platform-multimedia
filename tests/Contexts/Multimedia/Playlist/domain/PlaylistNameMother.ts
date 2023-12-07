import { PlaylistName } from '@Multimedia/Playlists/domain/PlaylistName'
import { WordMother } from '../../../Shared/domain/WordMother'

export class PlaylistNameMother {
  public static create(value: string): PlaylistName {
    return new PlaylistName(value)
  }

  public static random(): PlaylistName {
    return this.create(WordMother.random({ max: 5 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 50 })
  }
}
