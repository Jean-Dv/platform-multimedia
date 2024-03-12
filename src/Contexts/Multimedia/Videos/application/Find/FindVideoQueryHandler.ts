import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { FindVideoQuery } from './FindVideoQuery'
import { type VideoResponse } from '../VideoResponse'
import { type VideoFinder } from './VideoFinder'
import { type Query } from '@Shared/domain/Query'
import { VideoId } from '@Multimedia/Videos/domain/VideoId'

/**
 * Represents a query handler for finding video based on specified id.
 */
export class FindVideoQueryHandler
  implements QueryHandler<FindVideoQuery, VideoResponse>
{
  constructor(private readonly finder: VideoFinder) {}

  public subscribedTo(): Query {
    return FindVideoQuery
  }

  public async handle(query: FindVideoQuery): Promise<VideoResponse> {
    const id = new VideoId(query.id)
    return await this.finder.run(id)
  }
}
