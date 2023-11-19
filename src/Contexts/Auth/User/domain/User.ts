import { UserId } from '@Auth/Shared/domain/User/UserId'
import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { UserFirstName } from './UserFirstName'
import { UserLastName } from './UserLastName'
import { UserEmail } from './UserEmail'
import { UserPassword } from './UserPassword'
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent'

export class User extends AggregateRoot {
  public readonly id: UserId
  public readonly firstName: UserFirstName
  public readonly lastName: UserLastName
  public readonly email: UserEmail
  public readonly password: UserPassword

  constructor(
    id: UserId,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword
  ) {
    super()
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  /**
   * Creates a new User instance with the provided information and generates a unique identifier.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A new User instance.
   */
  public static create(
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword
  ): User {
    const id = UserId.random()
    const user = new User(id, firstName, lastName, email, password)
    user.record(
      new UserCreatedDomainEvent({
        aggregateId: id.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
      })
    )
    return user
  }

  /**
   * Create a new User from primitives.
   *
   * @param plainData User plain data.
   * @returns A new User instance.
   */
  public static fromPrimitives(plainData: {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
  }): User {
    return new User(
      new UserId(plainData.id),
      new UserFirstName(plainData.firstName),
      new UserLastName(plainData.lastName),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password)
    )
  }

  /**
   * Convert the User to primitives.
   *
   * @returns User plain data.
   */
  public toPrimitives(): Record<string, unknown> {
    return {
      id: this.id.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value
    }
  }
}
