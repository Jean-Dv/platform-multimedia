import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { type Role } from './Role'

export interface RoleRepository {
  save: (role: Role) => Promise<void>
  search: (roleName: RoleName) => Promise<Role | null>
}
