import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaCategoryId` for testing.
 */
export class BackofficeMultimediaCategoryIdMother {
  /**
   * Creates a `BackofficeMultimediaCategoryId` with the specified ID.
   *
   * @param id - The ID to be used for creating the instance.
   * @returns An instance of `BackofficeMultimediaCategoryId`.
   */
  public static create(id: string): BackofficeMultimediaCategoryId {
    return new BackofficeMultimediaCategoryId(id)
  }

  /**
   * Creates a random `BackofficeMultimediaCategoryId`.
   *
   * @returns A random instance of `BackofficeMultimediaCategoryId`.
   */
  public static random(): BackofficeMultimediaCategoryId {
    return this.create(UuidMother.random())
  }
}
