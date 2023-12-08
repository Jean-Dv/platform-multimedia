import { MultimediaUserResponse } from '@Multimedia/Users/application/MultimediaUserResponse'
import { type MultimediaUser } from '@Multimedia/Users/domain/MultimediaUser'

export class SearchMultimediaUserByIdResponseMother {
  public static create(user: MultimediaUser): MultimediaUserResponse {
    return new MultimediaUserResponse(user)
  }
}
