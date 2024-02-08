import { type RoleId } from '@Auth/Roles/domain/RoleId'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { RoleResponse } from '../RoleResponse'
import { RoleNotFound } from '@Auth/Roles/domain/RoleNotFound'

export class RoleByIdSearcher {
  constructor(private readonly repository: RoleRepository) {}

  public async run(id: RoleId): Promise<RoleResponse> {
    const role = await this.repository.searchById(id)
    if (role === null) {
      throw new RoleNotFound(`Role with id <${id.value}> not found`)
    }
    return new RoleResponse(role)
  }
}
