import { type Chapter } from '../domain/Chapter'

interface ChapterResponse {
  id: string
  title: string
  releaseYear: number
  season: string
  video: string
}

/**
 * Represents a response containing a list of chapters.
 */
export class ChaptersResponse {
  public readonly chapters: ChapterResponse[]

  constructor(chapters: Chapter[]) {
    this.chapters = chapters.map((chapter) => {
      const { id, title, releaseYear, season, video } = chapter.toPrimitives()
      return {
        id,
        title,
        releaseYear,
        season,
        video
      }
    })
  }
}
