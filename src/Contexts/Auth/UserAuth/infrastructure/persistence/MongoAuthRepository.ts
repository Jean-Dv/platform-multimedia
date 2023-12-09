import { type AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { type AuthRepository } from '@Auth/UserAuth/domain/AuthRepository'
import { AuthUser } from '@Auth/UserAuth/domain/AuthUser'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type Nullable } from '@Shared/domain/Nullable'

interface AuthDocument {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

/**
 * Repository implementation for authentication-related operations using MongoDB.
 */
export class MongoAuthRepository
  extends MongoRepository<AuthUser>
  implements AuthRepository
{
  /**
   * Searches for an authenticated user based on the provided email.
   *
   * @param email - The email associated with the user to search for.
   * @returns A Promise that resolves to an instance of AuthUser if found, or null if not found.
   */
  public async search(email: AuthEmail): Promise<Nullable<AuthUser>> {
    const collection = await this.collection()
    const document = await collection.findOne<AuthDocument>(
      {
        email: email.value
      },
      { projection: { email: 1, password: 1 } }
    )
    return document !== null
      ? AuthUser.fromPrimitives({
          email: document.email,
          password: document.password
        })
      : null
  }

  /**
   * Returns the name of the MongoDB collection used for storing authentication data.
   *
   * @returns The collection name as a string.
   */
  protected collectionName(): string {
    return 'users'
  }
}
