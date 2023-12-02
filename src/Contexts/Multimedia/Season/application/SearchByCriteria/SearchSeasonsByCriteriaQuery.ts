import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query for searching movies based on specified criteria.
 */
export class SearchSeasonsByCriteriaQuery implements Query {
  public readonly filters: Array<Map<string, string>>
  public readonly orderBy?: string
  public readonly orderType?: string
  public readonly limit?: number
  public readonly offset?: number

  constructor(
    filters: Array<Map<string, string>>,
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number
  ) {
    this.filters = filters
    this.orderBy = orderBy
    this.orderType = orderType
    this.limit = limit
    this.offset = offset
  }
}
