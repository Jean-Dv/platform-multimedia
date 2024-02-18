import { Role } from '@Auth/Roles/domain/Role'
import { RoleId } from '@Auth/Roles/domain/RoleId'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/auth/backend/dependency-injection'
import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { User } from '@Auth/User/domain/User'
import { UserId } from '@Auth/Shared/domain/User/UserId'
import { UserFirstName } from '@Auth/User/domain/UserFirstName'
import { UserLastName } from '@Auth/User/domain/UserLastName'
import { UserEmail } from '@Auth/User/domain/UserEmail'
import { UserPassword } from '@Auth/User/domain/UserPassword'

const roleRepository: RoleRepository = container.get(
  'Auth.Roles.domain.RoleRepository'
)

const userRepository: UserRepository = container.get(
  'Auth.User.domain.UserRepository'
)

Given('there is the roles:', async (roles: string) => {
  const rolesArray = JSON.parse(roles)
  for (const role of rolesArray) {
    await roleRepository.save(
      new Role(new RoleId(role.id), RoleName.fromValue(role.name))
    )
  }
})

Given('there is the user:', async (userStr: string) => {
  const userObject = JSON.parse(userStr)
  const user = new User(
    new UserId(userObject.id),
    new RoleName(userObject.role),
    new UserFirstName(userObject.firstName),
    new UserLastName(userObject.lastName),
    new UserEmail(userObject.email),
    new UserPassword(userObject.password)
  )
  await userRepository.save(user)
})
