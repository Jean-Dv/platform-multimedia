import { type User } from '../domain/User'

export class UserResponse {
  public readonly id: string

  constructor(user: User) {
    this.id = user.id.value
  }
}
