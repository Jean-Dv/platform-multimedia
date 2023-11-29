import { Filter } from './Filter'

/**
 * Represents a collection of filters.
 */
export class Filters {
  public readonly filters: Filter[]

  constructor(filters: Filter[]) {
    this.filters = filters
  }

  /**
   * Creates an instance of Filters from an array of filter values.
   *
   * @param filters - An array of maps containing filter values.
   * @returns An instance of Filters.
   */
  public static fromValues(filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map((filter) => Filter.fromValues(filter)))
  }

  /**
   * Creates an instance of Filters with no filters.
   *
   * @returns An instance of Filters with an empty array of filters.
   */
  public static none(): Filters {
    return new Filters([])
  }
}
