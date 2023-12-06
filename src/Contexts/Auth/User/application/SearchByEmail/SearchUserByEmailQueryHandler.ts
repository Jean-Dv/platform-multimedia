import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchUserByEmailQuery } from './SearchUserByEmailQuery'
import { type UserResponse } from '../UserResponse'
import { type UserByEmailSearcher } from './UserByEmailSearcher'
import { type Query } from '@Shared/domain/Query'

/**
 * Represents a query handler for searching user based on email criteria.
 */
export class SearchUserByEmailQueryHandler
  implements QueryHandler<SearchUserByEmailQuery, UserResponse>
{
  constructor(private readonly searcher: UserByEmailSearcher) {}

  public subscribedTo(): Query {
    return SearchUserByEmailQuery
  }

  public async handle(query: SearchUserByEmailQuery): Promise<UserResponse> {
    return await this.searcher.run(query.email)
  }
}
