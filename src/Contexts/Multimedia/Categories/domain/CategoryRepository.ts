import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type Category } from './Category'
import { type CategoryId } from './CategoryId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export interface CategoryRepository {
  save: (category: Category) => Promise<void>
  delete: (id: CategoryId) => Promise<void>
  search: (id: CategoryId) => Promise<Category | null>
  searchByName: (name: CategoryName) => Promise<Category | null>
  matching: (criteria: Criteria) => Promise<Category[]>
}
