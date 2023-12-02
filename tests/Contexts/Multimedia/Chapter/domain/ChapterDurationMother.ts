import { ChapterDuration } from '@Multimedia/Chapter/domain/ChapterDuration'

export class ChapterDurationMother {
  public static create(value: number): ChapterDuration {
    return new ChapterDuration(value)
  }

  public static random(): ChapterDuration {
    return this.create(Math.floor(Math.random() * 1000))
  }

  public static invalid(): number {
    return -1
  }
}
