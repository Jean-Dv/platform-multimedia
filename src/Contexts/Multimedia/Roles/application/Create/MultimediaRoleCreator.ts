import { MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { MultimediaRoleName } from '@Multimedia/Roles/domain/MultimediaRoleName'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'

export class MultimediaRoleCreator {
  constructor(private readonly repository: MultimediaRoleRepository) {}

  public async run(id: string, name: string): Promise<void> {
    const role = new MultimediaRole(
      new MultimediaRoleId(id),
      MultimediaRoleName.fromValue(name)
    )

    await this.repository.save(role)
  }
}
