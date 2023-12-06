import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { UserEmail } from '@Auth/User/domain/UserEmail'
import { UserResponse } from '../UserResponse'
import { UserNotFound } from '@Auth/User/domain/UserNotFound'

export class UserByEmailSearcher {
  constructor(private readonly repository: UserRepository) {}

  public async run(email: string): Promise<UserResponse> {
    const user = await this.repository.searchByEmail(new UserEmail(email))
    if (user === null || user === undefined)
      throw new UserNotFound(`User with email <${email}> not found`)
    return new UserResponse(user)
  }
}
