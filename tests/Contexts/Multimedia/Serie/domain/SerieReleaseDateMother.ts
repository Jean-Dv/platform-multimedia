import { SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { DateMother } from '../../../Shared/domain/DateMother'

export class SerieReleaseDateMother {
  public static create(value: Date): SerieReleaseDate {
    return new SerieReleaseDate(value)
  }

  public static random(): SerieReleaseDate {
    return this.create(DateMother.random().past())
  }
}
