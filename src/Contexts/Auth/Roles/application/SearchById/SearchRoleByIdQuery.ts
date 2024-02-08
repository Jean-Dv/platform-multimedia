import { Query } from '@Shared/domain/Query'

export class SearchRoleByIdQuery extends Query {
  public readonly id: string

  constructor(id: string) {
    super()
    this.id = id
  }
}
