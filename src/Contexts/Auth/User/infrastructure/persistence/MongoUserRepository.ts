import { type User } from '@Auth/User/domain/User'
import { UserPassword } from '@Auth/User/domain/UserPassword'
import { type UserRepository } from '@Auth/User/domain/UserRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

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
    user.setPassword(UserPassword.encrypt(user.getPassword()))
    await this.persist(user.id.value, user)
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
