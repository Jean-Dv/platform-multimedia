import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { type Role } from './Role'
import { type RoleId } from './RoleId'

export interface RoleRepository {
  save: (role: Role) => Promise<void>
  search: (roleName: RoleName) => Promise<Role | null>
  searchById: (id: RoleId) => Promise<Role | null>
}
