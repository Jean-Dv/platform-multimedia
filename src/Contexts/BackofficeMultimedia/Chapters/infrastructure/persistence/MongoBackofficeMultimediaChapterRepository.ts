import { BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface BackofficeMultimediaChapterMongoDocument {
  _id: UUID
  title: string
  releaseYear: number
  season: string
  video: string
}

export class MongoBackofficeMultimediaChapterRepository
  extends MongoRepository<BackofficeMultimediaChapter>
  implements BackofficeMultimediaChapterRepository
{
  public async save(chapter: BackofficeMultimediaChapter): Promise<void> {
    await this.persist(chapter.id.value, chapter)
  }

  public async search(
    id: BackofficeMultimediaChapterId
  ): Promise<BackofficeMultimediaChapter | null> {
    const chapter =
      await this.findById<BackofficeMultimediaChapterMongoDocument>(id.value)
    return chapter !== null
      ? BackofficeMultimediaChapter.fromPrimitives({
          id: chapter._id.toString(),
          title: chapter.title,
          releaseYear: chapter.releaseYear,
          season: chapter.season,
          video: chapter.video
        })
      : null
  }

  public async delete(chapter: BackofficeMultimediaChapter): Promise<void> {
    await this.erase(chapter.id.value)
  }

  protected collectionName(): string {
    return 'backoffice-multimedia-chapters'
  }
}
