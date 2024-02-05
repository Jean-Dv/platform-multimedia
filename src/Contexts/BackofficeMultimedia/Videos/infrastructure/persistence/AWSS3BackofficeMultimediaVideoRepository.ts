import { type BackofficeMultimediaVideo } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideo'
import { type BackofficeMultimediaVideoRepository } from '@BackofficeMultimedia/Videos/domain/BackofficeMultimediaVideoRepository'
import { AWSS3Repository } from '@Shared/infrastructure/persistence/aws-s3/AWSS3Repository'

export class AWSS3BackofficeMultimediaVideoRepository
  extends AWSS3Repository<BackofficeMultimediaVideo>
  implements BackofficeMultimediaVideoRepository
{
  public async save(video: BackofficeMultimediaVideo): Promise<void> {
    await this.persist(video.id.value, video)
  }

  protected bucketName(): string {
    return 'com.github.jean-dv.storage'
  }
}
