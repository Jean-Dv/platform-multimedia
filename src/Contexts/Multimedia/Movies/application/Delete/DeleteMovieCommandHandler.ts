import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteMovieCommand } from './DeleteMovieCommand'
import { type MovieDeletor } from './MovieDeletor'
import { type Command } from '@Shared/domain/Command'
import { MovieId } from '@Multimedia/Movies/domain/MovieId'

export class DeleteMovieCommandHandler
  implements CommandHandler<DeleteMovieCommand>
{
  constructor(private readonly deletor: MovieDeletor) {}

  public subscribedTo(): Command {
    return DeleteMovieCommand
  }

  public async handle(command: DeleteMovieCommand): Promise<void> {
    const id = new MovieId(command.id)
    await this.deletor.run(id)
  }
}
