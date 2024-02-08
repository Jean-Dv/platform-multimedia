import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchRoleByIdQuery } from './SearchRoleByIdQuery'
import { type RoleResponse } from '../RoleResponse'
import { type RoleByIdSearcher } from './RoleByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { RoleId } from '@Auth/Roles/domain/RoleId'

export class SearchRoleByIdQueryHandler
  implements QueryHandler<SearchRoleByIdQuery, RoleResponse>
{
  constructor(private readonly searcher: RoleByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchRoleByIdQuery
  }

  public async handle(query: SearchRoleByIdQuery): Promise<RoleResponse> {
    const id = new RoleId(query.id)
    return await this.searcher.run(id)
  }
}
