import { type InternetModule } from '@faker-js/faker'
import { MotherCreator } from './MotherCreator'

export class InternetMother {
  public static random(): InternetModule {
    return MotherCreator.random().internet
  }
}
