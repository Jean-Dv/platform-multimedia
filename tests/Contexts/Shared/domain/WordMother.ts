import { MotherCreator } from './MotherCreator'

export class WordMother {
  public static random({
    min = 1,
    max
  }: {
    min?: number
    max: number
  }): string {
    return MotherCreator.random().lorem.words({ min, max })
  }
}
