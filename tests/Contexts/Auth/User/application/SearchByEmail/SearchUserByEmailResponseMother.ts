import { UserResponse } from '@Auth/User/application/UserResponse'
import { type User } from '@Auth/User/domain/User'

export class SearchUserByEmailResponseMother {
  public static create(user: User): UserResponse {
    return new UserResponse(user)
  }
}
