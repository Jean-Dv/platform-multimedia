import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'

/**
 * Represents the email of a user.
 */
export class UserEmail extends StringValueObject {
  /**
   * Creates an instance of UserEmail.
   * @param value - The value of the user's email.
   */
  constructor(value: string) {
    super(value)
    this.ensureEmailIsValid(value)
  }

  /**
   * Ensures that the provided email is valid.
   * @param value - The email to be validated.
   * @throws If the email is not valid.
   */
  private ensureEmailIsValid(value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      throw new InvalidArgumentError(`The email <${value}> is not valid.`)
    }
  }
}
