import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'

/**
 * Represents the password of a user.
 */
export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensurePasswordIsStrong(value)
  }

  /**
   * Ensures that the provided password is strong.
   * @param value - The password to be validated.
   * @throws If the password is not strong.
   */
  private ensurePasswordIsStrong(value: string): void {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (passwordRegex.test(value)) {
      throw new InvalidArgumentError(`The password ${value} is not strong.`)
    }
  }
}
