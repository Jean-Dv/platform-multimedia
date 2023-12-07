import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { PlaylistNameLengthExceeded } from './PlaylistNameLengthExceeded'

export class PlaylistName extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthIsLessThan100Characters(value)
  }

  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length >= 100) {
      throw new PlaylistNameLengthExceeded(
        `The playlist name <${value}> has more than 100 characters`
      )
    }
  }
}
