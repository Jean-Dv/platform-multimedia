import { type AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { type AuthPassword } from '@Auth/UserAuth/domain/AuthPassword'
import { type AuthRepository } from '@Auth/UserAuth/domain/AuthRepository'
import { type AuthUser } from '@Auth/UserAuth/domain/AuthUser'
import { InvalidAuthCredentials } from '@Auth/UserAuth/domain/InvalidAuthCredentials'
import { InvalidAuthEmail } from '@Auth/UserAuth/domain/InvalidAuthEmail'
import { type Nullable } from '@Shared/domain/Nullable'

/**
 * Service responsible for authenticating users.
 */
export class UserAuthenticator {
  constructor(private readonly repository: AuthRepository) {}

  /**
   * Runs the authentication process using the provided email and password.
   *
   * @param params - An object containing the email and password for authentication.
   * @returns A Promise that resolves once the authentication process is complete.
   * @throws InvalidAuthEmail if the user with the provided email does not exist.
   * @throws InvalidAuthCredentials if the provided credentials are not valid.
   */
  public async run(params: {
    email: AuthEmail
    password: AuthPassword
  }): Promise<void> {
    const auth = await this.repository.search(params.email)

    this.ensureUserExists(auth, params.email)
    await this.ensureCredentialsAreValid(auth as AuthUser, params.password)
  }

  /**
   * Ensures that the user exists based on the search result.
   *
   * @param auth - The result of searching for the user.
   * @param email - The email used for the search.
   * @throws InvalidAuthEmail if the user with the provided email does not exist.
   */
  private ensureUserExists(auth: Nullable<AuthUser>, email: AuthEmail): void {
    if (auth === null || auth === undefined) {
      throw new InvalidAuthEmail(`The email <${email.value} is not valid`)
    }
  }

  /**
   * Ensures that the provided credentials are valid by comparing the password hash.
   *
   * @param auth - The authenticated user.
   * @param password - The password to be checked.
   * @throws InvalidAuthCredentials if the provided credentials are not valid.
   */
  private async ensureCredentialsAreValid(
    auth: AuthUser,
    password: AuthPassword
  ): Promise<void> {
    if (!(await auth.passwordMatches(password))) {
      throw new InvalidAuthCredentials(`The credentials are not valid`)
    }
  }
}
