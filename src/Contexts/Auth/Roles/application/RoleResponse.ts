import { type Role } from '../domain/Role'

interface IRoleResponse {
  id: string
  name: string
}

export class RoleResponse {
  public readonly role: IRoleResponse

  constructor(role: Role) {
    this.role = role.toPrimitives()
  }
}
