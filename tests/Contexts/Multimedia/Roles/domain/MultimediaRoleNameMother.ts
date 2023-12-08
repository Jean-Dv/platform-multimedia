import { MultimediaRoleName } from '@Multimedia/Roles/domain/MultimediaRoleName'

export class MultimediaRoleNameMother {
  public static create(value: string): MultimediaRoleName {
    return MultimediaRoleName.fromValue(value)
  }

  public static random(): MultimediaRoleName {
    const index = Math.floor(Math.random() * 2)
    const values = ['admin', 'registered']
    return this.create(values[index])
  }
}
