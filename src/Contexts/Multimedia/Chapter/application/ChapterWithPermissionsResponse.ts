import { type Chapter } from '../domain/Chapter'

interface ChapterResponse {
  id: string
  title: string
  releaseYear: number
  season: string
  video: string
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
