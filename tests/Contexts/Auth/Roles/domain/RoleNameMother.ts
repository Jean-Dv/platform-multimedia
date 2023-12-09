import { RoleName } from '@Auth/Shared/domain/Roles/RoleName'

export class RoleNameMother {
  public static create(value: string): RoleName {
    return RoleName.fromValue(value)
  }

  public static random(): RoleName {
    const number = Math.floor(Math.random() * 2)
    const values = ['admin', 'registered']
    return this.create(values[number])
  }

  public static invalid(): string {
    return 'invalid-role-name'
  }
}
