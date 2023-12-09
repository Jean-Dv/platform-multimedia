import { type MultimediaUser } from '../domain/MultimediaUser'

export class MultimediaUserResponse {
  public readonly id: string

  constructor(user: MultimediaUser) {
    this.id = user.id.value
  }
}
