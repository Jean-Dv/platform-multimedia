import { Role } from '@Auth/Roles/domain/Role'
import { type RoleId } from '@Auth/Roles/domain/RoleId'
import { type RoleName } from '@Auth/Roles/domain/RoleName'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { type EventBus } from '@Shared/domain/EventBus'

export class RoleCreator {
  constructor(
    private readonly repository: RoleRepository,
    private readonly eventBus: EventBus
  ) {}

  public async run(params: { id: RoleId; name: RoleName }): Promise<void> {
    const role = Role.create(params.id, params.name)
    await this.repository.save(role)
    await this.eventBus.publish(role.pullDomainEvents())
  }
}
