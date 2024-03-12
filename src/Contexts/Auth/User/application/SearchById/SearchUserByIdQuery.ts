import { Query } from '@Shared/domain/Query'

/**
 * Represents a query for search by id
 */
export class SearchUserByIdQuery extends Query {
  public readonly id: string

  constructor(id: string) {
    super()
    this.id = id
  }
}
