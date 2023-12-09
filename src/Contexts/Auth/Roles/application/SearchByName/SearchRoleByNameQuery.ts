import { Query } from '@Shared/domain/Query'

export class SearchRoleByNameQuery extends Query {
  public readonly name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}
