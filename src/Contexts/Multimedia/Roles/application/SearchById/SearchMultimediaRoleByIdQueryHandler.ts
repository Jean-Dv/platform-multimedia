import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { SearchMultimediaRoleByIdQuery } from './SearchMultimediaRoleByIdQuery'
import { type MultimediaRoleResponse } from '../MultimediaRoleResponse'
import { type MultimediaRoleByIdSearcher } from './MultimediaRoleByIdSearcher'
import { type Query } from '@Shared/domain/Query'
import { MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'

export class SearchMultimediaRoleByIdQueryHandler
  implements
    QueryHandler<SearchMultimediaRoleByIdQuery, MultimediaRoleResponse>
{
  constructor(private readonly searcher: MultimediaRoleByIdSearcher) {}

  public subscribedTo(): Query {
    return SearchMultimediaRoleByIdQuery
  }

  public async handle(
    query: SearchMultimediaRoleByIdQuery
  ): Promise<MultimediaRoleResponse> {
    const id = new MultimediaRoleId(query.id)
    return await this.searcher.run(id)
  }
}
