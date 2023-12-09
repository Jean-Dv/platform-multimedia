import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { RoleId } from './RoleId'
import { RoleName } from '../../Shared/domain/Roles/RoleName'
import { RoleCreatedDomainEvent } from './RoleCreatedDomainEvent'

export class Role extends AggregateRoot {
  public readonly id: RoleId
  public readonly name: RoleName

  constructor(id: RoleId, name: RoleName) {
    super()
    this.id = id
    this.name = name
  }

  public static create(id: RoleId, name: RoleName): Role {
    const role = new Role(id, name)
    role.record(
      new RoleCreatedDomainEvent({
        aggregateId: role.id.value,
        name: role.name.value
      })
    )
    return role
  }

  public static fromPrimitives(plainData: { id: string; name: string }): Role {
    return new Role(
      new RoleId(plainData.id),
      RoleName.fromValue(plainData.name)
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
