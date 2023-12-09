import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query for searching chapter by id.
 */
export class SearchChapterByIdQuery implements Query {
  public readonly id: string

  constructor(id: string) {
    this.id = id
  }
}
