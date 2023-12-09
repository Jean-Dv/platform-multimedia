import { MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { type MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface MultimediaRoleDocument {
  _id: string
  id: string
  name: string
}

export class MongoMultimediaRoleRepository
  extends MongoRepository<MultimediaRole>
  implements MultimediaRoleRepository
{
  public async save(role: MultimediaRole): Promise<void> {
    await this.persist(role.id.value, role)
  }

  public async search(id: MultimediaRoleId): Promise<MultimediaRole | null> {
    const collection = await this.collection()
    const document = await collection.findOne<MultimediaRoleDocument>({
      id: id.value
    })
    return document !== null
      ? MultimediaRole.fromPrimitives({
          id: document.id,
          name: document.name
        })
      : null
  }

  public collectionName(): string {
    return 'multimedia_roles'
  }
}
