import { MultimediaUser } from '@Multimedia/Users/domain/MultimediaUser'
import { MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'

export class MultimediaUserMother {
  public static create(id: MultimediaUserId): MultimediaUser {
    return new MultimediaUser(id)
  }

  public static random(): MultimediaUser {
    return this.create(MultimediaUserId.random())
  }
}
