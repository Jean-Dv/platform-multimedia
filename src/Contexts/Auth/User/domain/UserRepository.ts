import { type User } from './User'

export interface UserRepository {
  save: (user: User) => Promise<void>
}
