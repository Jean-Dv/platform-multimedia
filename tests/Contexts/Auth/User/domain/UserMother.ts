import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { type CreateUserCommand } from '@Auth/User/domain/CreateUserCommand'
import { User } from '@Auth/User/domain/User'
import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type UserFirstName } from '@Auth/User/domain/UserFirstName'
import { type UserLastName } from '@Auth/User/domain/UserLastName'
import { type UserPassword } from '@Auth/User/domain/UserPassword'
import { UserIdMother } from '../../Shared/User/domain/UserIdMother'
import { UserFirstNameMother } from './UserFirstNameMother'
import { UserLastNameMother } from './UserLastNameMother'
import { UserEmailMother } from './UserEmailMother'
import { UserPasswordMother } from './UserPasswordMother'
import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { RoleNameMother } from '../../Roles/domain/RoleNameMother'
import { type UserStartPlan } from '@Auth/Shared/domain/Transactions/UserStartPlan'
import { type UserEndPlan } from '@Auth/Shared/domain/Transactions/UserEndPlan'
import { UserStartPlanMother } from './UserStartPlanMother'
import { UserEndPlanMother } from './UserEndPlanMother'

export class UserMother {
  public static create(
    id: UserId,
    roleName: RoleName,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword,
    startPlan: UserStartPlan,
    endPlan: UserEndPlan
  ): User {
    return new User(
      id,
      roleName,
      firstName,
      lastName,
      email,
      password,
      startPlan,
      endPlan
    )
  }

  public static from(command: CreateUserCommand): User {
    return this.create(
      UserIdMother.create(command.id),
      RoleNameMother.create('registered'),
      UserFirstNameMother.create(command.firstName),
      UserLastNameMother.create(command.lastName),
      UserEmailMother.create(command.email),
      UserPasswordMother.create(command.password),
      UserStartPlanMother.create(new Date()),
      UserEndPlanMother.create(new Date())
    )
  }

  public static random(): User {
    return this.create(
      UserIdMother.random(),
      RoleNameMother.create('registered'),
      UserFirstNameMother.random(),
      UserLastNameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserStartPlanMother.random(),
      UserEndPlanMother.random()
    )
  }
}
