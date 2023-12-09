import { type User } from '../domain/User'

export class UserResponse {
  public readonly id: string
  public readonly roleName: string

  constructor(user: User) {
    this.id = user.id.value
    this.roleName = user.roleName.value
  }
}
