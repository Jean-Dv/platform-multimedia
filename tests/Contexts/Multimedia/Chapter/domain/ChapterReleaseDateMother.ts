import { ChapterReleaseDate } from '@Multimedia/Chapter/domain/ChapterReleaseDate'
import { DateMother } from '../../../Shared/domain/DateMother'

export class ChapterReleaseDateMother {
  public static create(value: Date): ChapterReleaseDate {
    return new ChapterReleaseDate(value)
  }

  public static random(): ChapterReleaseDate {
    return this.create(DateMother.random().past())
  }
}
