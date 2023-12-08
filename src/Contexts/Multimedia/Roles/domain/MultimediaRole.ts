import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { MultimediaRoleId } from './MultimediaRoleId'
import { MultimediaRoleName } from './MultimediaRoleName'

export class MultimediaRole extends AggregateRoot {
  public readonly id: MultimediaRoleId
  public readonly name: MultimediaRoleName

  constructor(id: MultimediaRoleId, name: MultimediaRoleName) {
    super()
    this.id = id
    this.name = name
  }

  public static fromPrimitives(plainData: {
    id: string
    name: string
  }): MultimediaRole {
    return new MultimediaRole(
      new MultimediaRoleId(plainData.id),
      MultimediaRoleName.fromValue(plainData.name)
    )
  }

  public toPrimitives(): {
    id: string
    name: string
  } {
    return {
      id: this.id.value,
      name: this.name.value
    }
  }
}
