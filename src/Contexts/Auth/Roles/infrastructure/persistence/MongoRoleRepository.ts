import { type Role } from '@Auth/Roles/domain/Role'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'

export class MongoRoleRepository
  extends MongoRepository<Role>
  implements RoleRepository
{
  public async save(role: Role): Promise<void> {
    await this.persist(role.id.value, role)
  }

  public collectionName(): string {
    return 'roles'
  }
}
