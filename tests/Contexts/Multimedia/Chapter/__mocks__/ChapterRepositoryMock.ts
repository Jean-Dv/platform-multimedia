import { type Chapter } from '@Multimedia/Chapter/domain/Chapter'
import { type ChapterRepository } from '@Multimedia/Chapter/domain/ChapterRepository'

export class ChapterRepositoryMock implements ChapterRepository {
  private readonly saveMock: jest.Mock

  constructor() {
    this.saveMock = jest.fn()
  }

  public async save(chapter: Chapter): Promise<void> {
    this.saveMock(chapter)
  }

  public assertSaveHaveBeenCalledWith(chapter: Chapter): void {
    expect(this.saveMock).toHaveBeenCalledWith(chapter)
  }
}
