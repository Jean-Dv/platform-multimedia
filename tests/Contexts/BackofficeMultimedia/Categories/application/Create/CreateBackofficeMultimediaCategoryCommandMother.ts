import { type CreateBackofficeMultimediaCategoryCommand } from '@BackofficeMultimedia/Categories/application/Create/CreateBackofficeMultimediaCategoryCommand'
import { type BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { type BackofficeMultimediaCategoryName } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryName'
import { BackofficeMultimediaCategoryIdMother } from '../../../Shared/domain/BackofficeMultimediaCategoryIdMother'
import { BackofficeMultimediaCategoryNameMother } from '../../domain/BackofficeMultimediaCategoryNameMother'

/**
 * Utility class for creating `CreateBackofficeMultimediaCategoryCommand` instances for testing.
 */
export class CreateBackofficeMultimediaCategoryCommandMother {
  /**
   * Creates a valid `CreateBackofficeMultimediaCategoryCommand`.
   *
   * @param id - The ID for the command.
   * @param name - The name for the command.
   * @returns A valid command.
   */
  public static create(
    id: BackofficeMultimediaCategoryId,
    name: BackofficeMultimediaCategoryName
  ): CreateBackofficeMultimediaCategoryCommand {
    return {
      id: id.value,
      name: name.value
    }
  }

  /**
   * Creates a random valid `CreateBackofficeMultimediaCategoryCommand`.
   *
   * @returns A random valid command.
   */
  public static random(): CreateBackofficeMultimediaCategoryCommand {
    return this.create(
      BackofficeMultimediaCategoryIdMother.random(),
      BackofficeMultimediaCategoryNameMother.random()
    )
  }

  /**
   * Creates an invalid `CreateBackofficeMultimediaCategoryCommand` with an invalid name.
   *
   * @returns An invalid command.
   */
  public static invalid(): CreateBackofficeMultimediaCategoryCommand {
    return {
      id: BackofficeMultimediaCategoryIdMother.random().value,
      name: BackofficeMultimediaCategoryNameMother.invalid()
    }
  }
}
