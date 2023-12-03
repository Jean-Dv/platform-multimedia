import { type Filters } from './Filters'
import { type Order } from './Order'

/**
 * Represents a set of criteria for querying data, including filters, order, limit, and offset.
 */
export class Criteria {
  public readonly filters: Filters
  public readonly order: Order
  public readonly limit?: number
  public readonly offset?: number

  constructor(filters: Filters, order: Order, limit?: number, offset?: number) {
    this.filters = filters
    this.order = order
    this.limit = limit
    this.offset = offset
  }

  /**
   * Checks if the criteria has filters.
   * @returns True if there are filters, false otherwise.
   */
  public hasFilters(): boolean {
    return this.filters.filters.length > 0
  }
}
