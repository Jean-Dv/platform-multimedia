import { type BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoBackofficeMultimediaChapterRepository
  extends MongoRepository<BackofficeMultimediaChapter>
  implements BackofficeMultimediaChapterRepository
{
  public async save(chapter: BackofficeMultimediaChapter): Promise<void> {
    await this.persist(chapter.id.value, chapter)
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-chapters'
  }
}
