import { CategoriesResponse } from '@Multimedia/Categories/application/CategoriesResponse'
import { type Category } from '@Multimedia/Categories/domain/Category'

export class SearchCategoriesByCriteriaResponseMother {
  public static create(categories: Category[]): CategoriesResponse {
    return new CategoriesResponse(categories)
  }
}
