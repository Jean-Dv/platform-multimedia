import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'
import { RoleResponse } from '../RoleResponse'
import { RoleNotFound } from '@Auth/Roles/domain/RoleNotFound'

export class RoleByNameSearcher {
  constructor(private readonly repository: RoleRepository) {}

  public async run(name: RoleName): Promise<RoleResponse> {
    const role = await this.repository.search(name)
    if (role === null || role === undefined)
      throw new RoleNotFound(`Role with name <${name.value}> not found`)
    return new RoleResponse(role)
  }
}
