import { type Category } from './Category'

export interface CategoryRepository {
  save: (category: Category) => Promise<void>
}