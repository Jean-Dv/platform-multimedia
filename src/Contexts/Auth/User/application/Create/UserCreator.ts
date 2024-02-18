import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { User } from '@Auth/User/domain/User'
import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type UserFirstName } from '@Auth/User/domain/UserFirstName'
import { type UserLastName } from '@Auth/User/domain/UserLastName'
import { type UserPassword } from '@Auth/User/domain/UserPassword'
import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { type EventBus } from '@Shared/domain/EventBus'
import { RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { UserExists } from '@Auth/User/domain/UserExists'

/**
 * Class responsible for creating and storing user entities.
 */
export class UserCreator {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  /**
   * Creates a new user with the provided information, saves it to the repository,
   * and publishes any domain events associated with user creation.
   *
   * @param params - The parameters needed to create the user.
   * @returns A Promise that resolves once the user is created and events are published.
   */
  public async run(params: {
    id: UserId
    firstName: UserFirstName
    lastName: UserLastName
    email: UserEmail
    password: UserPassword
  }): Promise<void> {
    if ((await this.repository.searchByEmail(params.email)) != null) {
      throw new UserExists(
        `User with email ${params.email.value} already exists.`
      )
    }
    const user = User.create(
      params.id,
      RoleName.fromValue('registered'),
      params.firstName,
      params.lastName,
      params.email,
      params.password
    )
    await this.repository.save(user)
    await this.eventBus.publish(user.pullDomainEvents())
  }
}
