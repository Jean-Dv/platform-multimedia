import { type DeleteCategoryCommand } from '@Multimedia/Categories/application/Delete/DeleteCategoryCommand'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryIdMother } from '../../domain/CategoryIdMother'

export class DeleteCategoryCommandMother {
  public static create(id: CategoryId): DeleteCategoryCommand {
    return {
      id: id.value
    }
  }

  public static random(): DeleteCategoryCommand {
    return this.create(CategoryIdMother.random())
  }
}
