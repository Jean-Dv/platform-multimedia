import { Video } from '@Multimedia/Videos/domain/Video'
import { type VideoId } from '@Multimedia/Videos/domain/VideoId'
import { type VideoRepository } from '@Multimedia/Videos/domain/VideoRepository'
import { AWSS3Repository } from '@Shared/infrastructure/persistence/aws-s3/AWSS3Repository'

export class AWSS3VideoRepository
  extends AWSS3Repository<Video>
  implements VideoRepository
{
  public async search(id: VideoId): Promise<Video | null> {
    const video = await this.retrieve(id.value)

    return video !== ''
      ? Video.fromPrimitives({ id: id.value, url: video })
      : null
  }

  protected bucketName(): string {
    return 'com.github.jean-dv.storage'
  }
}
