import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query for finding a video by id.
 */
export class FindVideoQuery implements Query {
  public readonly id: string

  constructor(id: string) {
    this.id = id
  }
}
