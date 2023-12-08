import { type CreateCategoryCommand } from '@Multimedia/Categories/application/Create/CreateCategoryCommand'
import { Category } from '@Multimedia/Categories/domain/Category'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryName } from '@Multimedia/Categories/domain/CategoryName'
import { CategoryIdMother } from './CategoryIdMother'
import { CategoryNameMother } from './CategoryNameMother'

export class CategoryMother {
  public static create(id: CategoryId, name: CategoryName): Category {
    return new Category(id, name)
  }

  public static from(command: CreateCategoryCommand): Category {
    return this.create(
      new CategoryId(command.id),
      new CategoryName(command.name)
    )
  }

  public static random(): Category {
    return this.create(CategoryIdMother.random(), CategoryNameMother.random())
  }
}
