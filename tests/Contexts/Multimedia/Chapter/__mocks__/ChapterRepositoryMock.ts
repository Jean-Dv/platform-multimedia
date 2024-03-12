import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterId } from '@Multimedia/Chapter/domain/ChapterId'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class ChapterRepositoryMock implements ChapterRepository {
  private readonly saveMock: jest.Mock
  private readonly matchingMock: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly chapters: Chapter[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.matchingMock = jest.fn()
    this.searchMock = jest.fn()
    this.deleteMock = jest.fn()
  }

  public async save(chapter: Chapter): Promise<void> {
    this.saveMock(chapter)
  }

  public async matching(criteria: Criteria): Promise<Chapter[]> {
    this.matchingMock(criteria)
    return this.chapters
  }

  public async search(id: ChapterId): Promise<Chapter | null> {
    this.searchMock(id)
    return (
      this.chapters.find((chapter) => chapter.id.value === id.value) ?? null
    )
  }

  public async delete(chapter: ChapterId): Promise<void> {
    this.deleteMock(chapter)
  }

  public assertSaveHaveBeenCalledWith(chapter: Chapter): void {
    expect(this.saveMock).toHaveBeenCalledWith(chapter)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.matchingMock).toHaveBeenCalled()
  }

  public assertSearchHaveBeenCalledWith(id: ChapterId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id)
  }

  public assertDeleteHaveBeenCalledWith(id: ChapterId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id)
  }

  public searchByCriteriaMockReturnValue(chapters: Chapter[]): void {
    this.chapters.push(...chapters)
  }

  public searchMockReturnValue(chapter: Chapter): void {
    this.chapters.push(chapter)
  }
}
