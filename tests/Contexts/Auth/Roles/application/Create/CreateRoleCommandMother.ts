import { type CreateRoleCommand } from '@Auth/Roles/application/Create/CreateRoleCommand'
import { type RoleId } from '@Auth/Shared/domain/Roles/RoleId'
import { type RoleName } from '@Auth/Roles/domain/RoleName'
import { RoleIdMother } from '../../domain/RoleIdMother'
import { RoleNameMother } from '../../domain/RoleNameMother'

export class CreateRoleCommandMother {
  public static create(id: RoleId, name: RoleName): CreateRoleCommand {
    return {
      id: id.value,
      name: name.value
    }
  }

  public static random(): CreateRoleCommand {
    return this.create(RoleIdMother.random(), RoleNameMother.random())
  }

  public static invalid(): CreateRoleCommand {
    return {
      id: RoleIdMother.random().value,
      name: RoleNameMother.invalid()
    }
  }
}
