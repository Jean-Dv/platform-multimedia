import { Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UUID } from 'mongodb'

interface ChapterDocument {
  _id: UUID
  id: string
  title: string
  releaseYear: number
  season: string
  video: string
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
        id: document._id.toString(),
        title: document.title,
        releaseYear: document.releaseYear,
        season: document.season,
        video: document.video
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
          id: document._id.toString(),
          title: document.title,
          releaseYear: document.releaseYear,
          season: document.season,
          video: document.video
        })
      : null
  }

  public async delete(id: ChapterId): Promise<void> {
    await this.erase(id.value)
  }

  protected collectionName(): string {
    return 'chapters'
  }
}
