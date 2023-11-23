import bcrypt from 'bcrypt'
import { StringValueObject } from '@Shared/domain/value-objects/StringValueObject'

/**
 * Represents the password of a user.
 */
export class UserPassword extends StringValueObject {
  /**
   * Encrypts a user password using bcrypt hashing.
   * @param userPassword - The user password to be encrypted.
   * @returns The encrypted user password.
   */
  public static encrypt(userPassword: UserPassword): UserPassword {
    return new UserPassword(bcrypt.hashSync(userPassword.value, 8))
  }
}
