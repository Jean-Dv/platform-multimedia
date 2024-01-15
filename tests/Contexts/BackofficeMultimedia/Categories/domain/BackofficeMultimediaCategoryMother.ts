import { BackofficeMultimediaCategoryIdMother } from '../../Shared/domain/BackofficeMultimediaCategoryIdMother'
import { type CreateBackofficeMultimediaCategoryCommand } from '@BackofficeMultimedia/Categories/application/Create/CreateBackofficeMultimediaCategoryCommand'
import { BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryName } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryName'
import { BackofficeMultimediaCategoryNameMother } from './BackofficeMultimediaCategoryNameMother'

/**
 * Factory class for creating instances of `BackofficeMultimediaCategory` for testing.
 */
export class BackofficeMultimediaCategoryMother {
  /**
   * Creates a `BackofficeMultimediaCategory` with the specified `id` and `name`.
   *
   * @param id - The `BackofficeMultimediaCategoryId` for the category.
   * @param name - The `BackofficeMultimediaCategoryName` for the category.
   * @returns An instance of `BackofficeMultimediaCategory`.
   */
  public static create(
    id: BackofficeMultimediaCategoryId,
    name: BackofficeMultimediaCategoryName
  ): BackofficeMultimediaCategory {
    return new BackofficeMultimediaCategory(id, name)
  }

  /**
   * Creates a `BackofficeMultimediaCategory` from the specified command.
   *
   * @param command - The `CreateBackofficeMultimediaCategoryCommand` to create the category from.
   * @returns An instance of `BackofficeMultimediaCategory`.
   */
  public static from(
    command: CreateBackofficeMultimediaCategoryCommand
  ): BackofficeMultimediaCategory {
    return this.create(
      new BackofficeMultimediaCategoryId(command.id),
      new BackofficeMultimediaCategoryName(command.name)
    )
  }

  /**
   * Creates a random `BackofficeMultimediaCategory`.
   *
   * @returns A random instance of `BackofficeMultimediaCategory`.
   */
  public static random(): BackofficeMultimediaCategory {
    return this.create(
      BackofficeMultimediaCategoryIdMother.random(),
      BackofficeMultimediaCategoryNameMother.random()
    )
  }
}
