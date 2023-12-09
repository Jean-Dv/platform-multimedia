import { type Category } from './Category'
import { type CategoryId } from './CategoryId'

export interface CategoryRepository {
  save: (category: Category) => Promise<void>
  delete: (id: CategoryId) => Promise<void>
  search: (id: CategoryId) => Promise<Category | null>
}
