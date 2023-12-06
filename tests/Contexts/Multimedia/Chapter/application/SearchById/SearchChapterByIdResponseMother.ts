import { ChapterWithPermissionsResponse } from '@Multimedia/Chapter/application/ChapterWithPermissionsResponse'
import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'

export class SearchChapterByIdResponseMother {
  public static create(chapter: Chapter): ChapterWithPermissionsResponse {
    return new ChapterWithPermissionsResponse(chapter)
  }
}
