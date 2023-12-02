import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface ChapterDocument {
  _id: string
  id: string
  seasonId: string
  title: string
  releaseDate: Date
  duration: number
}

export class MongoChapterRepository
  extends MongoRepository<Chapter>
  implements ChapterRepository
{
  public async save(chapter: Chapter): Promise<void> {
    await this.persist(chapter.id.value, chapter)
  }

  public async matching(criteria: Criteria): Promise<Chapter[]> {
    const document = await this.searchByCriteria<ChapterDocument>(criteria)
    return document.map((document) =>
      Chapter.fromPrimitives({
        id: document.id,
        seasonId: document.seasonId,
        title: document.title,
        releaseDate: document.releaseDate,
        duration: document.duration
      })
    )
  }

  protected collectionName(): string {
    return 'chapters'
  }
}
