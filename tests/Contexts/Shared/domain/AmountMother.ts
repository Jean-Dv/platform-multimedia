import { MotherCreator } from './MotherCreator'

/**
 * Factory for generating random amounts
 */
export class AmountMother {
  /**
   * Creates a random amount
   *
   * @returns A random amount
   */
  public static random(): number {
    return Number(
      MotherCreator.random().finance.amount({ min: 1000, max: 50000 })
    )
  }
}
