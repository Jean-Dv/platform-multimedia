import { RoleResponse } from '@Auth/Roles/application/RoleResponse'
import { type Role } from '@Auth/Roles/domain/Role'

export class SearchRoleByIdResponseMother {
  public static create(role: Role): RoleResponse {
    return new RoleResponse(role)
  }
}
