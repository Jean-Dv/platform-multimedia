import { type User } from '../domain/User'

export class UserResponse {
  public readonly id: string
  public readonly roleName: string
  public readonly startPlan: Date
  public readonly endPlan: Date

  constructor(user: User) {
    this.id = user.id.value
    this.roleName = user.roleName.value
    this.startPlan = user.startPlan.value
    this.endPlan = user.endPlan.value
  }
}
