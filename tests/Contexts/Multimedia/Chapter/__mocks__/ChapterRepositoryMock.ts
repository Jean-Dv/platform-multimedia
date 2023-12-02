import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class ChapterRepositoryMock implements ChapterRepository {
  private readonly saveMock: jest.Mock
  private readonly matchingMock: jest.Mock
  private readonly chapters: Chapter[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.matchingMock = jest.fn()
  }

  public async save(chapter: Chapter): Promise<void> {
    this.saveMock(chapter)
  }

  public async matching(criteria: Criteria): Promise<Chapter[]> {
    this.matchingMock(criteria)
    return this.chapters
  }

  public assertSaveHaveBeenCalledWith(chapter: Chapter): void {
    expect(this.saveMock).toHaveBeenCalledWith(chapter)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.matchingMock).toHaveBeenCalled()
  }

  public searchByCriteriaMockReturnValue(chapters: Chapter[]): void {
    this.chapters.push(...chapters)
  }
}
