import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteBackofficeMultimediaChapterCommand } from './DeleteBackofficeMultimediaChapterCommand'
import { type BackofficeMultimediaChapterDeletor } from './BackofficeMultimediaChapterDeletor'
import { type Command } from '@Shared/domain/Command'
import { BackofficeMultimediaChapterId } from '@BackofficeMultimedia/Chapters/domain/BackofficeMultimediaChapterId'

/**
 * Command handler for deleting backoffice multimedia chapters.
 */
export class DeleteBackofficeMultimediaChapterCommandHandler
  implements CommandHandler<DeleteBackofficeMultimediaChapterCommand>
{
  constructor(private readonly deletor: BackofficeMultimediaChapterDeletor) {}

  public subscribedTo(): Command {
    return DeleteBackofficeMultimediaChapterCommand
  }

  public async handle(
    command: DeleteBackofficeMultimediaChapterCommand
  ): Promise<void> {
    const id = new BackofficeMultimediaChapterId(command.id)
    await this.deletor.run(id)
  }
}
