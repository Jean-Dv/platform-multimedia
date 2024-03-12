import { UuidMother } from './../../../Shared/domain/UuidMother'
import { BackofficeMultimediaVideoPath } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoPath'

/**
 * Factory class for creating instances of `BackofficeMultimediaVideoPath` for testing.
 */
export class BackofficeMultimediaVideoPathMother {
  /**
   * Creates a `BackofficeMultimediaVideoPath` with the specified path.
   *
   * @param value - The path to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaVideoPath`.
   */
  public static create(value: string): BackofficeMultimediaVideoPath {
    return new BackofficeMultimediaVideoPath(value)
  }

  /**
   * Creates a random `BackofficeMultimediaVideoPath`.
   *
   * @returns A random instance of `BackofficeMultimediaVideoPath`.
   */
  public static random(): BackofficeMultimediaVideoPath {
    return this.create('public/' + UuidMother.random() + '.mp4')
  }
}
