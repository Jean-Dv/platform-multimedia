import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type User } from '../../../User/domain/User'
import { type Nullable } from '@Shared/domain/Nullable'

export interface UserRepository {
  /**
   * Saves a user in the repository.
   *
   * @params user - The user to save.
   */
  save: (user: User) => Promise<void>

  /**
   * Search an user by email.
   *
   * @param email - The email to search.
   */
  searchByEmail: (email: UserEmail) => Promise<Nullable<User>>
}
