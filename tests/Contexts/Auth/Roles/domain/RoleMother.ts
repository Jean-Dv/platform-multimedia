import { type CreateRoleCommand } from '@Auth/Roles/application/Create/CreateRoleCommand'
import { Role } from '@Auth/Roles/domain/Role'
import { type RoleId } from '@Auth/Roles/domain/RoleId'
import { type RoleName } from '@Auth/Roles/domain/RoleName'
import { RoleIdMother } from './RoleIdMother'
import { RoleNameMother } from './RoleNameMother'

export class RoleMother {
  public static create(id: RoleId, name: RoleName): Role {
    return new Role(id, name)
  }

  public static from(command: CreateRoleCommand): Role {
    return this.create(
      RoleIdMother.create(command.id),
      RoleNameMother.create(command.name)
    )
  }

  public static random(): Role {
    return this.create(RoleIdMother.random(), RoleNameMother.random())
  }
}
