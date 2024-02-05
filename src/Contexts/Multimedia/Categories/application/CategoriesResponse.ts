import { type Category } from '../domain/Category'

interface CategoryResponse {
  id: string
  name: string
}

/**
 * Represents a response with the categories.
 */
export class CategoriesResponse {
  public readonly categories: CategoryResponse[]

  constructor(categories: Category[]) {
    this.categories = categories.map((category) => category.toPrimitives())
  }
}
