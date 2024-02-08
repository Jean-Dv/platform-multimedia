import { User } from '@Auth/User/domain/User'
import { type UserRepository } from '@Auth/Shared/domain/User/UserRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type UserEmail } from '@Auth/User/domain/UserEmail'
import { type Nullable } from '@Shared/domain/Nullable'
import { type UserId } from '@Auth/Shared/domain/User/UserId'
import { type Uuid } from '@Shared/domain/value-objects/Uuid'

interface UserDocument {
  _id: Uuid
  id: string
  roleName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

/**
 * Repository implementation for storing and retrieving user entities
 * in a MongoDB database.
 */
export class MongoUserRepository
  extends MongoRepository<User>
  implements UserRepository
{
  /**
   * This method is used to save a user in the database.
   *
   * @param user The user to save.
   */
  public async save(user: User): Promise<void> {
    await this.persist(user.id.value, user)
  }

  public async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const collection = await this.collection()
    const document = await collection.findOne<UserDocument>({
      email: email.value
    })
    return document !== null
      ? User.fromPrimitives({
          id: document.id,
          roleName: document.roleName,
          firstName: document.firstName,
          lastName: document.lastName,
          email: document.email,
          password: document.password
        })
      : null
  }

  public async searchById(id: UserId): Promise<Nullable<User>> {
    const document = await this.findById<UserDocument>(id.value)
    return document !== null
      ? User.fromPrimitives({
          id: document.id,
          roleName: document.roleName,
          firstName: document.firstName,
          lastName: document.lastName,
          email: document.email,
          password: document.password
        })
      : null
  }

  /**
   * This method is used to define the name of the collection
   * where the users will be stored.
   *
   * @returns The name of the collection.
   */
  protected collectionName(): string {
    return 'users'
  }
}
