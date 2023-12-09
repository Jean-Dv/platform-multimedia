import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { type MultimediaUserRepository } from '@Multimedia/Users/domain/MultimediaUserRepository'
import { MultimediaUserResponse } from '../MultimediaUserResponse'
import { MultimediaUserNotFound } from '@Multimedia/Users/domain/MultimediaUserNotFound'

export class MultimediaUserByIdSearcher {
  constructor(private readonly repository: MultimediaUserRepository) {}

  public async run(id: MultimediaUserId): Promise<MultimediaUserResponse> {
    const user = await this.repository.search(id)
    if (user === null) {
      throw new MultimediaUserNotFound(`User with id <${id.value}> not found`)
    }
    return new MultimediaUserResponse(user)
  }
}
