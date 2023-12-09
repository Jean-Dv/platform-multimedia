import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import bcrypt from 'bcrypt'
import { AuthEmail } from './AuthEmail'
import { AuthPassword } from './AuthPassword'

/**
 * Represents an authenticated user in the system.
 * Extends the base class `AggregateRoot`.
 */
export class AuthUser extends AggregateRoot {
  public readonly email: AuthEmail
  public readonly password: AuthPassword

  constructor(email: AuthEmail, password: AuthPassword) {
    super()
    this.email = email
    this.password = password
  }

  /**
   * Checks if the provided password matches the user's stored password.
   *
   * @param password - The password to be checked.
   * @returns A Promise that resolves to a boolean indicating whether the passwords match.
   */
  public async passwordMatches(password: AuthPassword): Promise<boolean> {
    return await bcrypt.compare(password.value, this.password.value)
  }

  /**
   * Creates an instance of AuthUser from primitive data.
   *
   * @param plainData - An object containing the primitive data (email and password).
   * @returns An instance of AuthUser.
   */
  public static fromPrimitives(plainData: {
    email: string
    password: string
  }): AuthUser {
    return new AuthUser(
      new AuthEmail(plainData.email),
      new AuthPassword(plainData.password)
    )
  }

  /**
   * Converts the AuthUser instance to primitive data.
   * @returns An object containing the primitive data (email and password).
   */
  public toPrimitives(): Record<string, unknown> {
    return {
      email: this.email.value,
      password: this.password.value
    }
  }
}
