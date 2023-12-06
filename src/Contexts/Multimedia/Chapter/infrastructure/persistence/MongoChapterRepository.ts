import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface ChapterDocument {
  _id: string
  id: string
  seasonId: string
  title: string
  releaseDate: Date
  url: string
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
    return document.map((document) => {
      return Chapter.fromPrimitives({
        id: document.id,
        seasonId: document.seasonId,
        title: document.title,
        releaseDate: document.releaseDate,
        url: document.url,
        duration: document.duration
      })
    })
  }

  public async search(id: ChapterId): Promise<Chapter | null> {
    const collection = await this.collection()
    const document = await collection.findOne<ChapterDocument>({
      id: id.value
    })
    return document !== null
      ? Chapter.fromPrimitives({
          id: document.id,
          seasonId: document.seasonId,
          title: document.title,
          releaseDate: document.releaseDate,
          url: document.url,
          duration: document.duration
        })
      : null
  }

  protected collectionName(): string {
    return 'chapters'
  }
}
