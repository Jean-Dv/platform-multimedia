import { type Role } from './Role'

export interface RoleRepository {
  save: (role: Role) => Promise<void>
}
