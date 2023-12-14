import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteSerieCommand } from './DeleteSerieCommand'
import { type SerieDeletor } from './SerieDeletor'
import { type Command } from '@Shared/domain/Command'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'

export class DeleteSerieCommandHandler
  implements CommandHandler<DeleteSerieCommand>
{
  constructor(private readonly deletor: SerieDeletor) {}

  public subscribedTo(): Command {
    return DeleteSerieCommand
  }

  public async handle(command: DeleteSerieCommand): Promise<void> {
    const id = new SerieId(command.id)
    await this.deletor.run(id)
  }
}
