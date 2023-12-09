import { EnumValueObject } from '@Shared/domain/value-objects/EnumValueObject'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

export enum RoleNames {
  ADMIN = 'admin',
  REGISTERED = 'registered'
}

export class MultimediaRoleName extends EnumValueObject<RoleNames> {
  constructor(value: RoleNames) {
    super(value, Object.values(RoleNames))
  }

  public static fromValue(value: string): MultimediaRoleName {
    for (const roleNameValue of Object.values(RoleNames)) {
      if (value === roleNameValue.toString()) {
        return new MultimediaRoleName(roleNameValue)
      }
    }
    throw new InvalidArgumentError(`The role name <${value}> is invalid`)
  }

  public isAdmin(): boolean {
    return this.value === RoleNames.ADMIN
  }

  public isRegistered(): boolean {
    return this.value === RoleNames.REGISTERED
  }

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`The role name <${value}> is invalid`)
  }
}
