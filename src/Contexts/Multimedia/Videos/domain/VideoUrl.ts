import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'
import { VideoUrlIsInvalid } from './VideoUrlIsInvalid'

/**
 * This class represents the url of a video.
 */
export class VideoUrl extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsUrl(value)
  }

  /**
   * Ensures that the value is a valid url.
   *
   * @param value - The value to validate.
   */
  private ensureIsUrl(value: string): void {
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g

    if (!pattern.test(value)) {
      throw new VideoUrlIsInvalid('The video url is invalid.')
    }
  }
}
