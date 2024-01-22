import { type BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'

export class BackofficeMultimediaChapterRepositoryMock
  implements BackofficeMultimediaChapterRepository
{
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(chapter: BackofficeMultimediaChapter): Promise<void> {
    this.mockSave(chapter)
  }

  /**
   * Asserts that the `save` method has been called with the specified chapter.
   *
   * @param chapter - The expected chapter
   */
  public assertSaveHaveBeenCalledWith(
    chapter: BackofficeMultimediaChapter
  ): void {
    expect(this.mockSave).toHaveBeenCalledWith(chapter)
  }
}
