import { type MultimediaRole } from '../domain/MultimediaRole'

interface RoleResponse {
  id: string
  name: string
}

export class MultimediaRoleResponse {
  public readonly role: RoleResponse

  constructor(role: MultimediaRole) {
    this.role = role.toPrimitives()
  }
}
