import { type MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoMultimediaRoleRepository
  extends MongoRepository<MultimediaRole>
  implements MultimediaRoleRepository
{
  public async save(role: MultimediaRole): Promise<void> {
    await this.persist(role.id.value, role)
  }

  public collectionName(): string {
    return 'multimedia_roles'
  }
}
