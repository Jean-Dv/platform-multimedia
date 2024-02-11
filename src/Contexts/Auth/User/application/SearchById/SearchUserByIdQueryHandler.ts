import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchUserByIdQuery } from './SearchUserByIdQuery'
import { type UserResponse } from '../UserResponse'
import { type UserByIdSearcher } from './UserByIdSearcher'
import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query handler for searching user based on id.
 */
export class SearchUserByIdQueryHandler
  implements QueryHandler<SearchUserByIdQuery, UserResponse>
{
  constructor(private readonly searcher: UserByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchUserByIdQuery
  }

  public async handle(query: SearchUserByIdQuery): Promise<UserResponse> {
    return await this.searcher.run(query.id)
  }
}
