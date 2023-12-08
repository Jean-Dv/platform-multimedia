import { RoleId } from '@Auth/Roles/domain/RoleId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class RoleIdMother {
  public static create(value: string): RoleId {
    return new RoleId(value)
  }

  public static random(): RoleId {
    return new RoleId(UuidMother.random())
  }
}
