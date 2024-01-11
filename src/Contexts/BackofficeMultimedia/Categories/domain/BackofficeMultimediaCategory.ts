import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeMultimediaCategoryId } from './BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryName } from './BackofficeMultimediaCategoryName'
import { BackofficeMultimediaCategoryCreatedDomainEvent } from './BackofficeMultimediaCategoryCreatedDomainEvent'

/**
 * BackofficeCategory is an aggregate root representing a category in the backoffice.
 */
export class BackofficeMultimediaCategory extends AggregateRoot {
  public readonly id: BackofficeMultimediaCategoryId
  public readonly name: BackofficeMultimediaCategoryName

  constructor(
    id: BackofficeMultimediaCategoryId,
    name: BackofficeMultimediaCategoryName
  ) {
    super()
    this.id = id
    this.name = name
  }

  /**
   * Creates a new backoffice category.
   *
   * @param id - The unique identifier for the category.
   * @param name - The name of the backoffice category.
   * @returns An instance of the created backoffice category.
   */
  public static create(
    id: BackofficeMultimediaCategoryId,
    name: BackofficeMultimediaCategoryName
  ): BackofficeMultimediaCategory {
    const category = new BackofficeMultimediaCategory(id, name)
    category.record(
      new BackofficeMultimediaCategoryCreatedDomainEvent({
        aggregateId: id.value,
        name: name.value
      })
    )
    return category
  }

  /**
   * Creates a BackofficeCategory instance from plain data.
   *
   * @param plainData - Plain data containing the id and name of the backoffice category.
   * @returns A new BackofficeCategory instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    name: string
  }): BackofficeMultimediaCategory {
    return new BackofficeMultimediaCategory(
      new BackofficeMultimediaCategoryId(plainData.id),
      new BackofficeMultimediaCategoryName(plainData.name)
    )
  }

  /**
   * Converts the BackofficeCategory instance to plain data.
   *
   * @returns Plain data containing the id and name of the backoffice category.
   */
  public toPrimitives(): { id: string; name: string } {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }
}
