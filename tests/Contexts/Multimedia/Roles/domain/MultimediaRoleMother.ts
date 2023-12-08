import { MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { type MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { type MultimediaRoleName } from '@Multimedia/Roles/domain/MultimediaRoleName'
import { MultimediaRoleIdMother } from './MultimediaRoleIdMother'
import { MultimediaRoleNameMother } from './MultimediaRoleNameMother'

export class MultimediaRoleMother {
  public static create(
    id: MultimediaRoleId,
    name: MultimediaRoleName
  ): MultimediaRole {
    return new MultimediaRole(id, name)
  }

  public static withName(name: string): MultimediaRole {
    return this.create(
      MultimediaRoleIdMother.random(),
      MultimediaRoleNameMother.create(name)
    )
  }

  public static random(): MultimediaRole {
    return this.create(
      MultimediaRoleIdMother.random(),
      MultimediaRoleNameMother.random()
    )
  }
}
