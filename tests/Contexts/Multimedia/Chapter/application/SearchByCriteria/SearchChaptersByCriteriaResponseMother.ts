import { ChaptersResponse } from '@Multimedia/Chapter/application/ChaptersResponse'
import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'

export class SearchChaptersByCriteriaResponseMother {
  public static create(chapters: Chapter[]): ChaptersResponse {
    return new ChaptersResponse(chapters)
  }
}
