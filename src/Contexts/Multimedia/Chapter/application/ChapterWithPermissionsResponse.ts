import { type Chapter } from '../domain/Chapter'

interface ChapterResponse {
  id: string
  seasonId: string
  title: string
  duration: number
  releaseDate: Date
}

/**
 * Represents a response containing a one chapter
 * with url.
 */
export class ChapterWithPermissionsResponse {
  public readonly chapterResponse: ChapterResponse

  constructor(chapter: Chapter) {
    this.chapterResponse = chapter.toPrimitives()
  }
}
