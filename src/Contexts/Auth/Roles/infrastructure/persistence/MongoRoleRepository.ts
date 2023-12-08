import { Role } from '@Auth/Roles/domain/Role'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

interface RoleDocument {
  _id: string
  id: string
  name: string
}

export class MongoRoleRepository
  extends MongoRepository<Role>
  implements RoleRepository
{
  public async save(role: Role): Promise<void> {
    await this.persist(role.id.value, role)
  }

  public async search(name: RoleName): Promise<Role | null> {
    const collection = await this.collection()
    const document = await collection.findOne<RoleDocument>({
      name: name.value
    })
    return document !== null
      ? Role.fromPrimitives({
          id: document.id,
          name: document.name
        })
      : null
  }

  public collectionName(): string {
    return 'roles'
  }
}
