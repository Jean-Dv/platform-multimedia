import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CategoryId } from './CategoryId'
import { CategoryName } from '../../Shared/domain/Category/CategoryName'
import { CategoryCreatedDomainEvent } from './CategoryCreatedDomainEvent'
import { CategoryDeletedDomainEvent } from './CategoryDeletedDomainEvent'

export class Category extends AggregateRoot {
  public readonly id: CategoryId
  public readonly name: CategoryName

  constructor(id: CategoryId, name: CategoryName) {
    super()
    this.id = id
    this.name = name
  }

  public static create(id: CategoryId, name: CategoryName): Category {
    const category = new Category(id, name)
    category.record(
      new CategoryCreatedDomainEvent({
        aggregateId: id.value,
        name: name.value
      })
    )
    return category
  }

  public static delete(id: CategoryId, name: CategoryName): Category {
    const category = new Category(id, name)
    category.record(
      new CategoryDeletedDomainEvent({
        aggregateId: id.value,
        name: name.value
      })
    )
    return category
  }

  public static fromPrimitives(plainData: {
    id: string
    name: string
  }): Category {
    return new Category(
      new CategoryId(plainData.id),
      new CategoryName(plainData.name)
    )
  }

  public toPrimitives(): { id: string; name: string } {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }
}
