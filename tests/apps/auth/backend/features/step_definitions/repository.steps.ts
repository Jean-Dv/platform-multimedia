import { Role } from '@Auth/Roles/domain/Role'
import { RoleId } from '@Auth/Roles/domain/RoleId'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/auth/backend/dependency-injection'

const roleRepository: RoleRepository = container.get(
  'Auth.Roles.domain.RoleRepository'
)

Given('there is the roles:', async (roles: string) => {
  const rolesArray = JSON.parse(roles)
  for (const role of rolesArray) {
    await roleRepository.save(
      new Role(new RoleId(role.id), RoleName.fromValue(role.name))
    )
  }
})
