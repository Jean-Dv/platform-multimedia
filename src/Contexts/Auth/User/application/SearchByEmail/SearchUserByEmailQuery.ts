import { Query } from '@Shared/domain/Query'

/**
 * Represents a query for search by email
 */
export class SearchUserByEmailQuery extends Query {
  public readonly email: string

  constructor(email: string) {
    super()
    this.email = email
  }
}
