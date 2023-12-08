import { RoleResponse } from '@Auth/Roles/application/RoleResponse'
import { type Role } from '@Auth/Roles/domain/Role'

export class SearchRoleByNameResponseMother {
  public static create(role: Role): RoleResponse {
    return new RoleResponse(role)
  }
}
