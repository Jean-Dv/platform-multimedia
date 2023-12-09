import { MultimediaUser } from '@Multimedia/Users/domain/MultimediaUser'
import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { type MultimediaUserRepository } from '@Multimedia/Users/domain/MultimediaUserRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface MultimediaUserDocument {
  _id: string
  id: string
}

export class MongoMultimediaUserRepository
  extends MongoRepository<MultimediaUser>
  implements MultimediaUserRepository
{
  public async save(user: MultimediaUser): Promise<void> {
    await this.persist(user.id.value, user)
  }

  public async search(id: MultimediaUserId): Promise<MultimediaUser | null> {
    const collection = await this.collection()
    const document = await collection.findOne<MultimediaUserDocument>({
      id: id.value
    })
    return document !== null
      ? MultimediaUser.fromPrimitives({
          id: document.id
        })
      : null
  }

  public collectionName(): string {
    return 'multimedia_users'
  }
}
