import { type User } from '../../../User/domain/User'

export interface UserRepository {
  save: (user: User) => Promise<void>
}
