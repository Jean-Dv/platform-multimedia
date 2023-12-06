import { type Chapter } from '../domain/Chapter'

interface ChapterResponse {
  id: string
  seasonId: string
  title: string
  duration: number
  releaseDate: Date
}

/**
 * Represents a response containing a list of chapters.
 */
export class ChaptersResponse {
  public readonly chapters: ChapterResponse[]

  constructor(chapters: Chapter[]) {
    this.chapters = chapters.map((chapter) => {
      const { id, seasonId, title, duration, releaseDate } =
        chapter.toPrimitives()
      return {
        id,
        seasonId,
        title,
        duration,
        releaseDate
      }
    })
  }
}
