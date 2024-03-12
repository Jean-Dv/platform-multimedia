import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { UserResponse } from '../UserResponse'
import { UserId } from '@Auth/Shared/domain/User/UserId'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'

/**
 * This class is the representation of the use case to search a user by id
 */
export class UserByIdSearcher {
  constructor(private readonly repository: UserRepository) {}

  /**
   * Runs the use case
   *
   * @param id - The user id
   * @returns A promise that represents the user response
   */
  public async run(id: string): Promise<UserResponse> {
    const user = await this.repository.searchById(new UserId(id))
    if (user === null || user === undefined)
      throw new UserNotFound(`User with id <${id}> not found`)
    return new UserResponse(user)
  }
}
