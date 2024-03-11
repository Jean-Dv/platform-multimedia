import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteBackofficeMultimediaMovieCommand } from './DeleteBackofficeMultimediaMovieCommand'
import { type BackofficeMultimediaMovieDeletor } from './BackofficeMultimediaMovieDeletor'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'

export class DeleteBackofficeMultimediaMovieCommandHandler
  implements CommandHandler<DeleteBackofficeMultimediaMovieCommand>
{
  constructor(private readonly deletor: BackofficeMultimediaMovieDeletor) {}

  public subscribedTo(): Command {
    return DeleteBackofficeMultimediaMovieCommand
  }

  public async handle(
    command: DeleteBackofficeMultimediaMovieCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaMovieId(command.id)
    await this.deletor.run(id)
  }
}
