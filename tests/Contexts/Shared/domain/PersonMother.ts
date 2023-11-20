import { type PersonModule } from '@faker-js/faker'
import { MotherCreator } from './MotherCreator'

export class PersonMother {
  public static random(): PersonModule {
    return MotherCreator.random().person
  }
}
