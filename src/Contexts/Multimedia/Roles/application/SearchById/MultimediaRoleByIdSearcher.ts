import { type MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'
import { MultimediaRoleResponse } from '../MultimediaRoleResponse'
import { MultimediaRoleNotFound } from '@Multimedia/Roles/domain/MultimediaRoleNotFound'

export class MultimediaRoleByIdSearcher {
  constructor(private readonly repository: MultimediaRoleRepository) {}

  public async run(id: MultimediaRoleId): Promise<MultimediaRoleResponse> {
    const role = await this.repository.search(id)
    if (role === null) {
      throw new MultimediaRoleNotFound(`Role with id <${id.value}> not found`)
    }
    return new MultimediaRoleResponse(role)
  }
}
