import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchRoleByNameQuery } from './SearchRoleByNameQuery'
import { type RoleResponse } from '../RoleResponse'
import { type RoleByNameSearcher } from './RoleByNameSearcher'
import { type Query } from '@Shared/domain/Query'
import { RoleName } from '@Auth/Shared/domain/Roles/RoleName'

export class SearchRoleByNameQueryHandler
  implements QueryHandler<SearchRoleByNameQuery, RoleResponse>
{
  constructor(private readonly searcher: RoleByNameSearcher) {}

  public subscribedTo(): Query {
    return SearchRoleByNameQuery
  }

  public async handle(query: SearchRoleByNameQuery): Promise<RoleResponse> {
    const name = RoleName.fromValue(query.name)
    return await this.searcher.run(name)
  }
}
