import { type DateModule } from '@faker-js/faker'
import { MotherCreator } from './MotherCreator'

export class DateMother {
  public static random(): DateModule {
    return MotherCreator.random().date
  }
}
