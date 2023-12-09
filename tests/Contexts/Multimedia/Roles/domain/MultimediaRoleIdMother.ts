import { MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class MultimediaRoleIdMother {
  public static create(value: string): MultimediaRoleId {
    return new MultimediaRoleId(value)
  }

  public static random(): MultimediaRoleId {
    return this.create(UuidMother.random())
  }
}
