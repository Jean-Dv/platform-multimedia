import { MultimediaUser } from '../../domain/MultimediaUser'
import { MultimediaUserId } from '../../domain/MultimediaUserId'
import { type MultimediaUserRepository } from '../../domain/MultimediaUserRepository'

export class MultimediaUserCreator {
  constructor(private readonly repository: MultimediaUserRepository) {}

  public async run(id: string): Promise<void> {
    const user = new MultimediaUser(new MultimediaUserId(id))
    await this.repository.save(user)
  }
}
