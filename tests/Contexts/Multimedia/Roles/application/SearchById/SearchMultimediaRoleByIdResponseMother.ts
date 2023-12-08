import { MultimediaRoleResponse } from '@Multimedia/Roles/application/MultimediaRoleResponse'
import { type MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'

export class SearchMultimediaRoleByIdResponseMother {
  public static create(role: MultimediaRole): MultimediaRoleResponse {
    return new MultimediaRoleResponse(role)
  }
}
