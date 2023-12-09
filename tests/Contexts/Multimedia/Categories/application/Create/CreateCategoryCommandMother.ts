import { type CreateCategoryCommand } from '@Multimedia/Categories/application/Create/CreateCategoryCommand'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { CategoryIdMother } from '../../domain/CategoryIdMother'
import { CategoryNameMother } from '../../domain/CategoryNameMother'

export class CreateCategoryCommandMother {
  public static create(
    id: CategoryId,
    name: CategoryName
  ): CreateCategoryCommand {
    return {
      id: id.value,
      name: name.value
    }
  }

  public static random(): CreateCategoryCommand {
    return this.create(CategoryIdMother.random(), CategoryNameMother.random())
  }

  public static invalid(): CreateCategoryCommand {
    return {
      id: CategoryIdMother.random().value,
      name: CategoryNameMother.invalid()
    }
  }
}
