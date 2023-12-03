import { SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { DateMother } from '../../../Shared/domain/DateMother'

export class SeasonReleaseDateMother {
  public static create(value: Date): SeasonReleaseDate {
    return new SeasonReleaseDate(value)
  }

  public static random(): SeasonReleaseDate {
    return this.create(DateMother.random().past())
  }
}
