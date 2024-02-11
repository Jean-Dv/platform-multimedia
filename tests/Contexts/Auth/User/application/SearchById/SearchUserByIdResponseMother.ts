import { UserResponse } from '@Auth/User/application/UserResponse'
import { type User } from '@Auth/User/domain/User'

/**
 * This class represents the mother of the user response for searching user by id
 */
export class SearchUserByIdResponseMother {
  /**
   * Creates a user response
   *
   * @param user - The user
   * @returns A instance of user response
   */
  public static create(user: User): UserResponse {
    return new UserResponse(user)
  }
}
