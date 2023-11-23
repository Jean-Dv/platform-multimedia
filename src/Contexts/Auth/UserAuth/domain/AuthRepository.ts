import { type Nullable } from '@Shared/domain/Nullable'
import { type AuthEmail } from './AuthEmail'
import { type AuthUser } from './AuthUser'

export interface AuthRepository {
  search: (email: AuthEmail) => Promise<Nullable<AuthUser>>
}
