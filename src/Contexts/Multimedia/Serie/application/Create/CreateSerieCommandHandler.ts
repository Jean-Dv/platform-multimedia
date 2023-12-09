import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { type SerieCreator } from './SerieCreator'
import { CreateSerieCommand } from './CreateSerieCommand'
import { type Command } from '@Shared/domain/Command'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieTitle } from '@Multimedia/Serie/domain/SerieTitle'
import { SerieReleaseDate } from '@Multimedia/Serie/domain/SerieReleaseDate'
import { CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'

export class CreateSerieCommandHandler
  implements CommandHandler<CreateSerieCommand>
{
  constructor(private readonly serieCreator: SerieCreator) {}

  public subscribedTo(): Command {
    return CreateSerieCommand
  }

  public async handle(command: CreateSerieCommand): Promise<void> {
    const id = new SerieId(command.id)
    const category = new CategoryName(command.category)
    const title = new SerieTitle(command.title)
    const releaseDate = new SerieReleaseDate(command.releaseDate)
    await this.serieCreator.run({
      id,
      category,
      title,
      releaseDate
    })
  }
}
