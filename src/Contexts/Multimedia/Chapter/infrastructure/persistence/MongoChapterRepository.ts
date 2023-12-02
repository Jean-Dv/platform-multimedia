import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoChapterRepository
  extends MongoRepository<Chapter>
  implements ChapterRepository
{
  public async save(chapter: Chapter): Promise<void> {
    await this.persist(chapter.id.value, chapter)
  }

  protected collectionName(): string {
    return 'chapters'
  }
}
