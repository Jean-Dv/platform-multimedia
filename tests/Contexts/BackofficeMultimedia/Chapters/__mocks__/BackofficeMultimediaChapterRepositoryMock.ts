import { type BackofficeMultimediaChapter } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapter'
import { type BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'
import { type BackofficeMultimediaChapterRepository } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterRepository'

export class BackofficeMultimediaChapterRepositoryMock
  implements BackofficeMultimediaChapterRepository
{
  private readonly mockSave: jest.Mock
  private readonly mockSearch: jest.Mock
  private readonly mockDelete: jest.Mock
  private readonly chapters: BackofficeMultimediaChapter[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
    this.mockDelete = jest.fn()
  }

  public async save(chapter: BackofficeMultimediaChapter): Promise<void> {
    this.mockSave(chapter)
  }

  public async search(
    id: BackofficeMultimediaChapterId
  ): Promise<BackofficeMultimediaChapter | null> {
    return (
      this.chapters.find((chapter) => chapter.id.value === id.value) ?? null
    )
  }

  public async delete(chapter: BackofficeMultimediaChapter): Promise<void> {
    this.mockDelete(chapter)
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

  /**
   * Asserts that the `search` method has been called with the specified id.
   *
   * @param id - The expected id
   */
  public assertSearchHaveBeenCalledWith(
    id: BackofficeMultimediaChapterId
  ): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  /**
   * Asserts that the `delete` method has been called with the specified chapter.
   *
   * @param chapter - The expected chapter
   */
  public assertDeleteHaveBeenCalledWith(
    chapter: BackofficeMultimediaChapter
  ): void {
    expect(this.mockDelete).toHaveBeenCalledWith(chapter)
  }

  /**
   * Sets the chapters that the repository will return when searching for chapters.
   *
   * @param chapters - The chapters to be set.
   */
  public setChapters(chapters: BackofficeMultimediaChapter[]): void {
    this.chapters.push(...chapters)
  }
}
