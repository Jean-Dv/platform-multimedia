import { Query } from '@Shared/domain/Query'

export class SearchAllPlaylistsQuery extends Query {
  public readonly userId: string

  constructor(userId: string) {
    super()
    this.userId = userId
  }
}
