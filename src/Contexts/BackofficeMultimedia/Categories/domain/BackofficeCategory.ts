import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { BackofficeCategoryId } from './BackofficeCategoryId'
import { BackofficeCategoryName } from './BackofficeCategoryName'
import { BackofficeCategoryCreatedDomainEvent } from './BackofficeCategoryCreatedDomainEvent'

/**
 * BackofficeCategory is an aggregate root representing a category in the backoffice.
 */
export class BackofficeCategory extends AggregateRoot {
  public readonly id: BackofficeCategoryId
  public readonly name: BackofficeCategoryName

  constructor(id: BackofficeCategoryId, name: BackofficeCategoryName) {
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
    id: BackofficeCategoryId,
    name: BackofficeCategoryName
  ): BackofficeCategory {
    const category = new BackofficeCategory(id, name)
    category.record(
      new BackofficeCategoryCreatedDomainEvent({
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
  }): BackofficeCategory {
    return new BackofficeCategory(
      new BackofficeCategoryId(plainData.id),
      new BackofficeCategoryName(plainData.name)
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
