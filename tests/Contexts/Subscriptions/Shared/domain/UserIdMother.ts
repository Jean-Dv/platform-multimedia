import { UserId } from '@Subscriptions/Shared/domain/UserId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory to create UserId value objects
 */
export class UserIdMother {
  /**
   * Creates a UserId value object.
   *
   * @param value - The value to create the UserId
   * @returns An instance of UserId
   */
  public static create(value: string): UserId {
    return new UserId(value)
  }

  /**
   * Creates a random UserId value object.
   *
   * @returns A random UserId value object
   */
  public static random(): UserId {
    return this.create(UuidMother.random())
  }
}
